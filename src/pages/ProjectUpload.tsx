import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Upload, X, ArrowLeft, ArrowRight, Loader2, Camera, ShieldCheck } from "lucide-react";
import SEO from "@/components/SEO";
import { cn } from "@/lib/utils";

type ProjectType =
  | "interior_painting"
  | "exterior_painting"
  | "cabinets"
  | "remodeling"
  | "deck_staining"
  | "other";

const PROJECT_TYPES: { value: ProjectType; label: string }[] = [
  { value: "interior_painting", label: "Interior Painting" },
  { value: "exterior_painting", label: "Exterior Painting" },
  { value: "cabinets", label: "Cabinet Refinishing" },
  { value: "remodeling", label: "Remodeling" },
  { value: "deck_staining", label: "Deck Staining" },
  { value: "other", label: "Something Else" },
];

const TIMELINES = ["ASAP", "Within 2 weeks", "Within a month", "1 to 3 months", "Just exploring"];
const BUDGETS = ["Under $2k", "$2k to $5k", "$5k to $15k", "$15k to $50k", "$50k+", "Not sure yet"];

const MAX_PHOTOS = 10;
const MAX_SIZE_MB = 8;
const MAX_DIMENSION = 1920;

interface PhotoItem {
  id: string;
  file: File;
  previewUrl: string;
  compressed: boolean;
}

async function compressImage(file: File): Promise<File> {
  if (!file.type.startsWith("image/")) return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
    const w = Math.round(bitmap.width * scale);
    const h = Math.round(bitmap.height * scale);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, w, h);
    const blob: Blob | null = await new Promise((res) =>
      canvas.toBlob(res, "image/jpeg", 0.82),
    );
    if (!blob) return file;
    return new File([blob], file.name.replace(/\.[^.]+$/, "") + ".jpg", {
      type: "image/jpeg",
      lastModified: Date.now(),
    });
  } catch {
    return file;
  }
}

const ProjectUpload = () => {
  const [params] = useSearchParams();
  const tag = params.get("tag") || "";
  const sid = params.get("sid") || "";
  const typeParam = (params.get("type") || "").toLowerCase();

  const initialProjectType = useMemo<ProjectType | "">(() => {
    const match = PROJECT_TYPES.find((p) => p.value === typeParam);
    return match ? match.value : "";
  }, [typeParam]);

  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [projectType, setProjectType] = useState<ProjectType | "">(initialProjectType);
  const [timeline, setTimeline] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot

  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [processing, setProcessing] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialProjectType) setProjectType(initialProjectType);
  }, [initialProjectType]);

  useEffect(() => {
    return () => {
      photos.forEach((p) => URL.revokeObjectURL(p.previewUrl));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const canNext1 = name.trim().length >= 2 && (phone.trim().length >= 7 || /.+@.+\..+/.test(email));
  const canNext2 = !!projectType;

  const handleFiles = async (files: FileList | null) => {
    if (!files || !files.length) return;
    setProcessing(true);
    const remaining = MAX_PHOTOS - photos.length;
    const list = Array.from(files).slice(0, Math.max(0, remaining));
    const next: PhotoItem[] = [];
    for (const raw of list) {
      if (raw.size > MAX_SIZE_MB * 1024 * 1024 * 4) continue;
      const compressed = await compressImage(raw);
      next.push({
        id: crypto.randomUUID(),
        file: compressed,
        previewUrl: URL.createObjectURL(compressed),
        compressed: compressed !== raw,
      });
    }
    setPhotos((prev) => [...prev, ...next]);
    setProcessing(false);
    if (fileRef.current) fileRef.current.value = "";
  };

  const removePhoto = (id: string) => {
    setPhotos((prev) => {
      const item = prev.find((p) => p.id === id);
      if (item) URL.revokeObjectURL(item.previewUrl);
      return prev.filter((p) => p.id !== id);
    });
  };

  const handleSubmit = async () => {
    setError(null);
    if (website.trim()) {
      // honeypot: silently succeed
      setSubmitted(true);
      return;
    }
    if (!consent) {
      setError("Please confirm the consent checkbox to continue.");
      return;
    }
    setSubmitting(true);
    try {
      // Placeholder: real submit-project-lead edge function wired in next stage.
      await new Promise((r) => setTimeout(r, 900));
      // eslint-disable-next-line no-console
      console.log("[project-upload] payload preview", {
        tag,
        sid,
        source_type: tag ? "nfc" : null,
        project_type: projectType,
        name, phone, email, city, state,
        timeline, budget, message,
        photo_count: photos.length,
      });
      setSubmitted(true);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 py-10">
        <SEO title="Thanks — Tony's Painting" description="Your project has been submitted." />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg w-full bg-surface rounded-2xl p-8 md:p-12 shadow-sm border border-stone text-center"
        >
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <Check className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-serif text-3xl md:text-4xl text-text-primary mb-3">Got it. Thank you.</h1>
          <p className="text-text-secondary mb-2">
            Your project details are with our team. Otoniel or a project lead will reach out shortly.
          </p>
          <p className="text-text-secondary text-sm">Typical response time is under 24 hours on business days.</p>
          <Link
            to="/"
            className="inline-block mt-8 text-primary hover:text-primary-dark font-medium"
          >
            Back to home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Start Your Project — Tony's Painting"
        description="Share your project details and photos. Fast, private estimate from Tony's Painting."
      />

      {/* Header */}
      <header className="bg-dark text-white">
        <div className="max-w-3xl mx-auto px-4 py-5 flex items-center justify-between">
          <Link to="/" className="font-serif text-xl md:text-2xl tracking-tight">
            Tony's Painting
          </Link>
          <span className="text-xs md:text-sm text-white/70 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" /> Private and secure
          </span>
        </div>
      </header>

      {/* Progress */}
      <div className="max-w-3xl mx-auto px-4 pt-8">
        <div className="flex items-center justify-between mb-2 text-xs uppercase tracking-wider text-text-secondary">
          <span>Step {step} of 3</span>
          <span>
            {step === 1 && "Your details"}
            {step === 2 && "About the project"}
            {step === 3 && "Photos and review"}
          </span>
        </div>
        <div className="h-1 bg-stone rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={false}
            animate={{ width: `${(step / 3) * 100}%` }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          />
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 py-10">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-3xl md:text-5xl text-text-primary leading-tight mb-2"
        >
          Tell us about your project
        </motion.h1>
        <p className="text-text-secondary mb-8 md:mb-10">
          A few quick details and a couple photos are all we need to get you a real estimate.
        </p>

        <div className="bg-surface border border-stone rounded-2xl p-6 md:p-10 shadow-sm">
          {/* Honeypot */}
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="hidden"
            aria-hidden="true"
          />

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                <Field label="Full name" required>
                  <input
                    className="input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Smith"
                    maxLength={80}
                  />
                </Field>
                <div className="grid md:grid-cols-2 gap-5">
                  <Field label="Phone">
                    <input
                      className="input"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(555) 123 4567"
                      inputMode="tel"
                      maxLength={30}
                    />
                  </Field>
                  <Field label="Email">
                    <input
                      className="input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      inputMode="email"
                      maxLength={120}
                    />
                  </Field>
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <Field label="City">
                    <input
                      className="input"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Edgartown"
                      maxLength={80}
                    />
                  </Field>
                  <Field label="State">
                    <input
                      className="input"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="MA"
                      maxLength={40}
                    />
                  </Field>
                </div>
                <p className="text-xs text-text-secondary">
                  We need at least a phone number or an email to reach you.
                </p>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-3">
                    Project type <span className="text-primary">*</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                    {PROJECT_TYPES.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setProjectType(opt.value)}
                        className={cn(
                          "text-left px-4 py-3 rounded-lg border transition-all text-sm",
                          projectType === opt.value
                            ? "border-primary bg-primary/5 text-text-primary"
                            : "border-stone bg-background hover:border-text-secondary text-text-primary",
                        )}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <Field label="Timeline">
                  <select
                    className="input"
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                  >
                    <option value="">Select a timeline</option>
                    {TIMELINES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </Field>

                <Field label="Budget range">
                  <select
                    className="input"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                  >
                    <option value="">Select a range</option>
                    {BUDGETS.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </Field>

                <Field label="Anything else we should know">
                  <textarea
                    className="input min-h-[110px] resize-y"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Rooms, colors, current state of the surface, access notes..."
                    maxLength={1200}
                  />
                </Field>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">
                    Project photos
                  </label>
                  <p className="text-xs text-text-secondary mb-3">
                    Up to {MAX_PHOTOS} photos. We auto-resize large images so uploads are fast.
                  </p>

                  <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                    {photos.map((p) => (
                      <div
                        key={p.id}
                        className="relative aspect-square rounded-lg overflow-hidden border border-stone group"
                      >
                        <img
                          src={p.previewUrl}
                          alt="project"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(p.id)}
                          className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-dark/80 text-white flex items-center justify-center opacity-90 hover:opacity-100"
                          aria-label="Remove photo"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}

                    {photos.length < MAX_PHOTOS && (
                      <button
                        type="button"
                        onClick={() => fileRef.current?.click()}
                        className="aspect-square rounded-lg border-2 border-dashed border-stone hover:border-primary hover:bg-primary/5 transition-colors flex flex-col items-center justify-center text-text-secondary"
                      >
                        {processing ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <>
                            <Camera className="w-5 h-5 mb-1" />
                            <span className="text-xs">Add photo</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => handleFiles(e.target.files)}
                  />
                </div>

                <div className="border-t border-stone pt-5">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-1 w-4 h-4 accent-primary"
                    />
                    <span className="text-sm text-text-secondary">
                      I agree to be contacted by Tony's Painting about my project. My information stays private and is never sold.
                    </span>
                  </label>
                </div>

                {error && (
                  <div className="text-sm text-primary bg-primary/5 border border-primary/20 rounded-lg px-4 py-3">
                    {error}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Nav buttons */}
          <div className="flex items-center justify-between mt-10">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary text-sm font-medium"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            ) : <span />}

            {step < 3 && (
              <button
                type="button"
                disabled={(step === 1 && !canNext1) || (step === 2 && !canNext2)}
                onClick={() => setStep((s) => s + 1)}
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium px-6 py-3 rounded-lg transition-colors"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {step === 3 && (
              <button
                type="button"
                disabled={submitting}
                onClick={handleSubmit}
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark disabled:opacity-60 text-white font-medium px-6 py-3 rounded-lg transition-colors"
              >
                {submitting ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Sending</>
                ) : (
                  <><Upload className="w-4 h-4" /> Submit project</>
                )}
              </button>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-text-secondary mt-6">
          Tony's Painting and Remodeling · Serving Martha's Vineyard and New England since 2004
        </p>
      </main>
    </div>
  );
};

const Field = ({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) => (
  <div>
    <label className="block text-sm font-medium text-text-primary mb-2">
      {label} {required && <span className="text-primary">*</span>}
    </label>
    {children}
  </div>
);

export default ProjectUpload;
