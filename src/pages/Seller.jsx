import { useState } from "react";
import "./Seller.css";

const steps = ["Account Info", "Business Details", "Documents & IDs", "Bank & Payout", "Review"];

const categories = [
  "Electronics", "Fashion & Apparel", "Home & Living", "Beauty & Personal Care",
  "Sports & Outdoors", "Books & Stationery", "Toys & Games", "Grocery & Food",
  "Automotive", "Health & Wellness", "Jewelry & Accessories", "Art & Crafts",
];

const initialForm = {
  fullName: "", email: "", phone: "", password: "", confirmPassword: "",
  businessName: "", businessType: "individual", gstin: "", pan: "",
  businessAddress: "", city: "", state: "", pincode: "",
  category: "", storeDescription: "",
  aadhaar: "", drivingLicense: "", passport: "", voterID: "",
  bankName: "", accountNumber: "", ifsc: "", accountHolder: "",
  upiId: "",
  agreeTerms: false, agreePolicy: false,
};

export default function SellerPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const update = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (step === 0) {
      if (!form.fullName.trim()) errs.fullName = "Full name is required.";
      if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = "Enter a valid email.";
      if (!form.phone.match(/^\d{10}$/)) errs.phone = "Enter a valid 10-digit mobile number.";
      if (form.password.length < 8) errs.password = "Minimum 8 characters.";
      if (form.password !== form.confirmPassword) errs.confirmPassword = "Passwords do not match.";
    }
    if (step === 1) {
      if (!form.businessName.trim()) errs.businessName = "Business name is required.";
      if (!form.gstin.match(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/))
        errs.gstin = "Enter a valid 15-character GSTIN.";
      if (!form.pan.match(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)) errs.pan = "Enter a valid PAN (e.g. ABCDE1234F).";
      if (!form.businessAddress.trim()) errs.businessAddress = "Address is required.";
      if (!form.city.trim()) errs.city = "City is required.";
      if (!form.pincode.match(/^\d{6}$/)) errs.pincode = "Enter a valid 6-digit PIN code.";
    }
    if (step === 2) {
      if (!form.aadhaar.match(/^\d{12}$/) && !form.drivingLicense && !form.passport && !form.voterID)
        errs.aadhaar = "Provide at least one valid government ID.";
      if (form.aadhaar && !form.aadhaar.match(/^\d{12}$/))
        errs.aadhaar = "Aadhaar must be 12 digits.";
    }
    if (step === 3) {
      if (!form.bankName.trim()) errs.bankName = "Bank name is required.";
      if (!form.accountNumber.match(/^\d{9,18}$/)) errs.accountNumber = "Enter a valid account number.";
      if (!form.ifsc.match(/^[A-Z]{4}0[A-Z0-9]{6}$/)) errs.ifsc = "Enter a valid IFSC code.";
      if (!form.accountHolder.trim()) errs.accountHolder = "Account holder name is required.";
    }
    if (step === 4) {
      if (!form.agreeTerms) errs.agreeTerms = "You must agree to the terms.";
      if (!form.agreePolicy) errs.agreePolicy = "You must agree to the seller policy.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const next = () => { if (validate()) setStep((s) => Math.min(s + 1, steps.length - 1)); };
  const back = () => setStep((s) => Math.max(s - 1, 0));
  const handleSubmit = () => { if (validate()) setSubmitted(true); };

  if (submitted) {
    return (
      <div className="sp-page">
        <div className="sp-success">
          <div className="sp-success-icon">✓</div>
          <h2>Application Submitted!</h2>
          <p>
            Welcome aboard, <strong>{form.fullName}</strong>! Your seller application for{" "}
            <strong>{form.businessName}</strong> is under review.
          </p>
          <p className="sp-success-sub">
            You'll receive a confirmation at <strong>{form.email}</strong> within 24–48 hours.
            Once approved, you can start listing products in your store.
          </p>
          <div className="sp-success-steps">
            <div className="sp-success-step"><span>1</span>Email Verification</div>
            <div className="sp-success-step sp-active"><span>2</span>Document Review</div>
            <div className="sp-success-step"><span>3</span>Account Activated</div>
          </div>
          <button className="sp-btn-primary" onClick={() => { setSubmitted(false); setStep(0); setForm(initialForm); }}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="sp-page">
      <header className="sp-header">
        <div className="sp-header-inner">
          <div className="sp-logo">
            <span className="sp-logo-icon">🛒</span>
            <span className="sp-logo-text">MarketHub</span>
          </div>
          <nav className="sp-header-nav">
            <a href="#">How it works</a>
            <a href="#">Fees & Pricing</a>
            <a href="#">Help Center</a>
            <a href="#" className="sp-nav-login">Sign In</a>
          </nav>
        </div>
      </header>

      <section className="sp-hero">
        <div className="sp-hero-content">
          <div className="sp-hero-badge">🚀 Join 2M+ Sellers</div>
          <h1>Grow Your Business with MarketHub</h1>
          <p>Reach millions of buyers across India. Zero listing fee, zero monthly charges.</p>
          <div className="sp-hero-stats">
            <div className="sp-stat"><strong>2M+</strong><span>Active Sellers</span></div>
            <div className="sp-stat"><strong>50M+</strong><span>Buyers Nationwide</span></div>
            <div className="sp-stat"><strong>₹0</strong><span>Listing Fee</span></div>
            <div className="sp-stat"><strong>24hr</strong><span>Fast Approval</span></div>
          </div>
        </div>
        <div className="sp-hero-img">
          <div className="sp-hero-card">
            <div className="sp-hero-card-top">
              <div className="sp-avatar">RS</div>
              <div>
                <div className="sp-hc-name">Rahul's Store</div>
                <div className="sp-hc-tag">⭐ Top Seller · Electronics</div>
              </div>
            </div>
            <div className="sp-hc-stat-row">
              <div className="sp-hc-stat"><div className="sp-hc-val">₹4.2L</div><div className="sp-hc-lbl">This Month</div></div>
              <div className="sp-hc-stat"><div className="sp-hc-val">842</div><div className="sp-hc-lbl">Orders</div></div>
              <div className="sp-hc-stat"><div className="sp-hc-val">4.9★</div><div className="sp-hc-lbl">Rating</div></div>
            </div>
            <div className="sp-hc-bar">
              <div className="sp-hc-bar-fill" style={{ width: "78%" }}></div>
            </div>
            <div className="sp-hc-bar-label">Monthly target: 78%</div>
          </div>
        </div>
      </section>

      <section className="sp-perks">
        <div className="sp-perks-inner">
          {[
            { icon: "📦", title: "Easy Listing", desc: "List products in under 5 minutes with bulk upload support" },
            { icon: "🚚", title: "Logistics Support", desc: "Pan-India delivery handled by our logistics network" },
            { icon: "💰", title: "Quick Payouts", desc: "Payments settled within 7 days of delivery" },
            { icon: "📊", title: "Seller Dashboard", desc: "Real-time analytics, inventory & order management" },
            { icon: "🛡️", title: "Seller Protection", desc: "100% protection against fraudulent claims" },
            { icon: "🎓", title: "Free Training", desc: "Onboarding support and seller academy access" },
          ].map((p) => (
            <div className="sp-perk" key={p.title}>
              <div className="sp-perk-icon">{p.icon}</div>
              <div className="sp-perk-title">{p.title}</div>
              <div className="sp-perk-desc">{p.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="sp-form-section" id="register">
        <div className="sp-form-wrap">
          <div className="sp-form-header">
            <h2>Seller Registration</h2>
            <p>Complete all steps to activate your seller account</p>
          </div>

          <div className="sp-stepper">
            {steps.map((s, i) => (
              <div
                key={s}
                className={`sp-step ${i === step ? "sp-step-active" : ""} ${i < step ? "sp-step-done" : ""}`}
              >
                <div className="sp-step-num">{i < step ? "✓" : i + 1}</div>
                <div className="sp-step-label">{s}</div>
              </div>
            ))}
          </div>

          <div className="sp-form-body">
            {step === 0 && (
              <StepAccount form={form} update={update} errors={errors} showPassword={showPassword} setShowPassword={setShowPassword} />
            )}
            {step === 1 && <StepBusiness form={form} update={update} errors={errors} categories={categories} />}
            {step === 2 && <StepDocuments form={form} update={update} errors={errors} />}
            {step === 3 && <StepBank form={form} update={update} errors={errors} />}
            {step === 4 && <StepReview form={form} update={update} errors={errors} />}
          </div>

          <div className="sp-form-footer">
            {step > 0 && (
              <button className="sp-btn-secondary" onClick={back}>← Back</button>
            )}
            {step < steps.length - 1 ? (
              <button className="sp-btn-primary" onClick={next}>Continue →</button>
            ) : (
              <button className="sp-btn-primary sp-btn-submit" onClick={handleSubmit}>
                Submit Application 🎉
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="sp-faq">
        <h2>Frequently Asked Questions</h2>
        <div className="sp-faq-grid">
          {[
            { q: "What documents are needed?", a: "You need a valid GSTIN, PAN card, Aadhaar or other government ID, and a bank account for payouts." },
            { q: "How long does approval take?", a: "Most accounts are approved within 24–48 hours after document verification." },
            { q: "What commission does MarketHub charge?", a: "Commission varies by category — typically 2% to 15%. No monthly fee or listing fee." },
            { q: "Can I sell across all categories?", a: "Yes! You can list in multiple categories after getting category-level approval." },
          ].map((f) => (
            <div className="sp-faq-item" key={f.q}>
              <div className="sp-faq-q">{f.q}</div>
              <div className="sp-faq-a">{f.a}</div>
            </div>
          ))}
        </div>
      </section>

      <footer className="sp-footer">
        <div className="sp-footer-inner">
          <div className="sp-footer-brand">
            <span className="sp-logo-icon">🛒</span> MarketHub
          </div>
          <div className="sp-footer-links">
            <a href="#">Terms of Service</a>
            <a href="#">Seller Policy</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Contact Support</a>
          </div>
          <div className="sp-footer-copy">© 2025 MarketHub. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}

function Field({ label, required, error, children, hint }) {
  return (
    <div className="sp-field">
      <label className="sp-label">
        {label} {required && <span className="sp-required">*</span>}
      </label>
      {children}
      {hint && !error && <div className="sp-hint">{hint}</div>}
      {error && <div className="sp-error">{error}</div>}
    </div>
  );
}

function StepAccount({ form, update, errors, showPassword, setShowPassword }) {
  return (
    <div className="sp-step-content">
      <div className="sp-step-title">
        <span>👤</span> Personal Account Information
      </div>
      <div className="sp-grid-2">
        <Field label="Full Name" required error={errors.fullName}>
          <input value={form.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="e.g. Rahul Sharma" />
        </Field>
        <Field label="Email Address" required error={errors.email}>
          <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="rahul@example.com" />
        </Field>
        <Field label="Mobile Number" required error={errors.phone} hint="10-digit Indian mobile number">
          <div className="sp-input-prefix">
            <span>+91</span>
            <input value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="9876543210" maxLength={10} />
          </div>
        </Field>
        <div />
        <Field label="Password" required error={errors.password} hint="Minimum 8 characters">
          <div className="sp-input-suffix">
            <input type={showPassword ? "text" : "password"} value={form.password} onChange={(e) => update("password", e.target.value)} placeholder="Create a strong password" />
            <button type="button" className="sp-toggle-pass" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </Field>
        <Field label="Confirm Password" required error={errors.confirmPassword}>
          <input type={showPassword ? "text" : "password"} value={form.confirmPassword} onChange={(e) => update("confirmPassword", e.target.value)} placeholder="Re-enter password" />
        </Field>
      </div>
    </div>
  );
}

function StepBusiness({ form, update, errors, categories }) {
  return (
    <div className="sp-step-content">
      <div className="sp-step-title"><span>🏪</span> Business Details</div>
      <div className="sp-grid-2">
        <Field label="Business / Store Name" required error={errors.businessName}>
          <input value={form.businessName} onChange={(e) => update("businessName", e.target.value)} placeholder="e.g. Rahul Electronics" />
        </Field>
        <Field label="Business Type" required>
          <select value={form.businessType} onChange={(e) => update("businessType", e.target.value)}>
            <option value="individual">Individual / Sole Proprietor</option>
            <option value="partnership">Partnership Firm</option>
            <option value="pvtltd">Private Limited Company</option>
            <option value="llp">LLP</option>
            <option value="trust">Trust / NGO</option>
          </select>
        </Field>
        <Field label="GSTIN" required error={errors.gstin} hint="15-character GST Identification Number">
          <input value={form.gstin} onChange={(e) => update("gstin", e.target.value.toUpperCase())} placeholder="22ABCDE1234F1Z5" maxLength={15} className="sp-mono" />
        </Field>
        <Field label="PAN Card Number" required error={errors.pan} hint="10-character Permanent Account Number">
          <input value={form.pan} onChange={(e) => update("pan", e.target.value.toUpperCase())} placeholder="ABCDE1234F" maxLength={10} className="sp-mono" />
        </Field>
        <Field label="Product Category" required>
          <select value={form.category} onChange={(e) => update("category", e.target.value)}>
            <option value="">Select primary category</option>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>
        <div />
        <Field label="Registered Business Address" required error={errors.businessAddress}>
          <input value={form.businessAddress} onChange={(e) => update("businessAddress", e.target.value)} placeholder="Street, Locality" />
        </Field>
        <Field label="City" required error={errors.city}>
          <input value={form.city} onChange={(e) => update("city", e.target.value)} placeholder="e.g. Mumbai" />
        </Field>
        <Field label="State" required>
          <input value={form.state} onChange={(e) => update("state", e.target.value)} placeholder="e.g. Maharashtra" />
        </Field>
        <Field label="PIN Code" required error={errors.pincode}>
          <input value={form.pincode} onChange={(e) => update("pincode", e.target.value)} placeholder="400001" maxLength={6} />
        </Field>
      </div>
      <Field label="Store Description">
        <textarea rows={3} value={form.storeDescription} onChange={(e) => update("storeDescription", e.target.value)} placeholder="Tell buyers what makes your store unique (shown on your seller profile)" />
      </Field>
    </div>
  );
}

function StepDocuments({ form, update, errors }) {
  return (
    <div className="sp-step-content">
      <div className="sp-step-title"><span>📋</span> Identity Documents</div>
      <div className="sp-doc-note">
        ⓘ Provide at least one government-issued photo ID. These are used for one-time KYC verification and are never shared.
      </div>
      <div className="sp-grid-2">
        <Field label="Aadhaar Card Number" error={errors.aadhaar} hint="12-digit Aadhaar number">
          <input value={form.aadhaar} onChange={(e) => update("aadhaar", e.target.value)} placeholder="XXXX XXXX XXXX" maxLength={12} className="sp-mono" />
        </Field>
        <Field label="PAN Card" hint="Already provided in Business Details">
          <input value={form.pan} disabled className="sp-mono sp-disabled" />
        </Field>
        <Field label="Driving License Number" hint="Optional — as supplementary ID">
          <input value={form.drivingLicense} onChange={(e) => update("drivingLicense", e.target.value)} placeholder="DL-1420110012345" className="sp-mono" />
        </Field>
        <Field label="Passport Number" hint="Optional">
          <input value={form.passport} onChange={(e) => update("passport", e.target.value)} placeholder="A1234567" className="sp-mono" />
        </Field>
        <Field label="Voter ID (EPIC)" hint="Optional">
          <input value={form.voterID} onChange={(e) => update("voterID", e.target.value)} placeholder="ABC1234567" className="sp-mono" />
        </Field>
      </div>
      <div className="sp-upload-zone">
        <div className="sp-upload-icon">📁</div>
        <div className="sp-upload-text">Upload scanned copies / photos of your documents</div>
        <div className="sp-upload-sub">Accepted: JPG, PNG, PDF · Max 5MB per file</div>
        <button className="sp-btn-outline">Choose Files</button>
      </div>
    </div>
  );
}

function StepBank({ form, update, errors }) {
  return (
    <div className="sp-step-content">
      <div className="sp-step-title"><span>🏦</span> Bank & Payout Details</div>
      <div className="sp-doc-note">
        ⓘ Payouts are processed every 7 days to the bank account provided. Ensure the account is in the same name as your PAN card.
      </div>
      <div className="sp-grid-2">
        <Field label="Bank Name" required error={errors.bankName}>
          <input value={form.bankName} onChange={(e) => update("bankName", e.target.value)} placeholder="e.g. State Bank of India" />
        </Field>
        <Field label="Account Holder Name" required error={errors.accountHolder}>
          <input value={form.accountHolder} onChange={(e) => update("accountHolder", e.target.value)} placeholder="As per bank records" />
        </Field>
        <Field label="Account Number" required error={errors.accountNumber}>
          <input value={form.accountNumber} onChange={(e) => update("accountNumber", e.target.value)} placeholder="Enter account number" className="sp-mono" />
        </Field>
        <Field label="IFSC Code" required error={errors.ifsc} hint="11-character bank branch code">
          <input value={form.ifsc} onChange={(e) => update("ifsc", e.target.value.toUpperCase())} placeholder="SBIN0001234" maxLength={11} className="sp-mono" />
        </Field>
        <Field label="UPI ID (Optional)" hint="For instant payment support">
          <input value={form.upiId} onChange={(e) => update("upiId", e.target.value)} placeholder="yourname@upi" />
        </Field>
      </div>
      <div className="sp-cancel-cheque">
        <div className="sp-upload-zone">
          <div className="sp-upload-icon">🧾</div>
          <div className="sp-upload-text">Upload Cancelled Cheque or Passbook Front Page</div>
          <div className="sp-upload-sub">Required for bank account verification · PDF or image, max 2MB</div>
          <button className="sp-btn-outline">Upload Document</button>
        </div>
      </div>
    </div>
  );
}

function StepReview({ form, update, errors }) {
  const rows = [
    ["Full Name", form.fullName], ["Email", form.email], ["Phone", `+91 ${form.phone}`],
    ["Business Name", form.businessName], ["Business Type", form.businessType],
    ["GSTIN", form.gstin], ["PAN", form.pan], ["Category", form.category],
    ["Address", `${form.businessAddress}, ${form.city}, ${form.state} – ${form.pincode}`],
    ["Bank", `${form.bankName} | A/c: ${form.accountNumber} | IFSC: ${form.ifsc}`],
  ];
  return (
    <div className="sp-step-content">
      <div className="sp-step-title"><span>✅</span> Review & Submit</div>
      <div className="sp-review-table">
        {rows.map(([k, v]) => v ? (
          <div className="sp-review-row" key={k}>
            <div className="sp-review-key">{k}</div>
            <div className="sp-review-val">{v}</div>
          </div>
        ) : null)}
      </div>
      <div className="sp-agreements">
        <label className={`sp-check-label ${errors.agreeTerms ? "sp-err" : ""}`}>
          <input type="checkbox" checked={form.agreeTerms} onChange={(e) => update("agreeTerms", e.target.checked)} />
          I agree to MarketHub's <a href="#">Terms of Service</a> and <a href="#">Seller Agreement</a>
        </label>
        {errors.agreeTerms && <div className="sp-error">{errors.agreeTerms}</div>}
        <label className={`sp-check-label ${errors.agreePolicy ? "sp-err" : ""}`}>
          <input type="checkbox" checked={form.agreePolicy} onChange={(e) => update("agreePolicy", e.target.checked)} />
          I confirm that all submitted information and documents are genuine and accurate
        </label>
        {errors.agreePolicy && <div className="sp-error">{errors.agreePolicy}</div>}
      </div>
    </div>
  );
}