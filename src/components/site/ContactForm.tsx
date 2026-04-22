import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// Endpoint configured via VITE_FORMSPREE_ENDPOINT env var.
// When unset, the form simulates a successful submission (mock mode).
const ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined;

const SERVICES = [
  "Interior Painting",
  "Exterior Painting",
  "Remodeling",
  "Handyman Services",
  "Multiple Services",
  "Not Sure Yet",
];

type FormState = {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  service: string;
  project: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const emptyForm: FormState = {
  fullName: "",
  phone: "",
  email: "",
  address: "",
  service: "",
  project: "",
};

const ContactForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): Errors => {
    const next: Errors = {};
    if (!formData.fullName.trim()) next.fullName = "This field is required.";
    if (!formData.phone.trim()) next.phone = "This field is required.";
    if (!formData.email.trim()) {
      next.email = "This field is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      next.email = "Please enter a valid email.";
    }
    if (!formData.address.trim()) next.address = "This field is required.";
    if (!formData.service) next.service = "This field is required.";
    return next;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    setSubmitting(true);
    try {
      if (ENDPOINT) {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error("Request failed");
      } else {
        await new Promise((r) => setTimeout(r, 600));
      }
      setSubmitted(true);
      navigate("/thank-you");
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-10">
        <h3 className="font-display text-3xl md:text-4xl text-foreground">
          We got your request.
        </h3>
        <p className="mt-4 text-muted-foreground max-w-md mx-auto leading-relaxed">
          Thank you for reaching out. Someone from our team will contact you within one business day.
        </p>
        <Button
          asChild
          variant="outline"
          className="mt-8 border-foreground text-foreground hover:bg-foreground hover:text-background rounded-sm"
        >
          <Link to="/">Back to Home</Link>
        </Button>
      </div>
    );
  }

  const errorMsg = (key: keyof FormState) =>
    errors[key] ? (
      <p className="text-sm text-destructive mt-1">{errors[key]}</p>
    ) : null;

  const inputClass = (key: keyof FormState) =>
    cn("rounded-sm", errors[key] && "border-destructive focus-visible:ring-destructive");

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          value={formData.fullName}
          onChange={(e) => setField("fullName", e.target.value)}
          aria-invalid={!!errors.fullName}
          className={cn("mt-2", inputClass("fullName"))}
        />
        {errorMsg("fullName")}
      </div>

      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setField("phone", e.target.value)}
          aria-invalid={!!errors.phone}
          className={cn("mt-2", inputClass("phone"))}
        />
        {errorMsg("phone")}
      </div>

      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setField("email", e.target.value)}
          aria-invalid={!!errors.email}
          className={cn("mt-2", inputClass("email"))}
        />
        {errorMsg("email")}
      </div>

      <div>
        <Label htmlFor="address">Property Address</Label>
        <Input
          id="address"
          value={formData.address}
          onChange={(e) => setField("address", e.target.value)}
          aria-invalid={!!errors.address}
          className={cn("mt-2", inputClass("address"))}
        />
        {errorMsg("address")}
      </div>

      <div>
        <Label htmlFor="service">Service Needed</Label>
        <Select
          value={formData.service}
          onValueChange={(v) => setField("service", v)}
        >
          <SelectTrigger
            id="service"
            aria-invalid={!!errors.service}
            className={cn(
              "mt-2 rounded-sm",
              errors.service && "border-destructive focus:ring-destructive",
            )}
          >
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent>
            {SERVICES.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errorMsg("service")}
      </div>

      <div>
        <Label htmlFor="project">
          Tell us about your project{" "}
          <span className="text-muted-foreground font-normal">(optional)</span>
        </Label>
        <Textarea
          id="project"
          rows={4}
          value={formData.project}
          onChange={(e) => setField("project", e.target.value)}
          placeholder="Describe the space, what needs to be done, any details that help us prepare a better estimate."
          className="mt-2 rounded-sm"
        />
      </div>

      <Button
        type="submit"
        disabled={submitting}
        className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary-dark rounded-sm text-base"
      >
        {submitting ? "Sending..." : "Send My Request"}
      </Button>
    </form>
  );
};

export default ContactForm;
