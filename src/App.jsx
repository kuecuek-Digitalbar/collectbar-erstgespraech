import { useState } from "react";

const APP_PASSWORD = "collectbar2026";

export default function CollectbarTool() {
  const questions = [
    { title: "Kanzleiname", type: "input", placeholder: "Name der Kanzlei eingeben..." },
    { title: "Kurzvorstellung Person", type: "textarea", placeholder: "Wer ist meine Ansprechperson, seine Rolle im Projekt ..." },
    { title: "Agenda", type: "textarea", placeholder: "Begrüßung - Kurze Einordnung des Anliegens - Abfrage der Anforderungen und Kanzleibedürfnisse - Einholung von Informationen zu Funktionen und Möglichkeiten - Klärung der benötigten Informationen und Voraussetzungen für die Umsetzung - Nächste Schritte." },
    { title: "Wie arbeiten Sie aktuell mit eingehenden Dokumenten?", type: "textarea", placeholder: "Papier, Scan, E-Mail, Upload, DATEV Upload Mobil etc." },
    { title: "Welche Systeme werden bereits genutzt?", type: "textarea", placeholder: "DATEV DMS, Unternehmen Online, Meine Steuern, Personalakte etc." },
    { title: "Gibt es aktuell Probleme oder Engpässe?", type: "textarea", placeholder: "Medienbrüche, Suchzeiten, fehlende Transparenz, Freigaben, Unterschriftenprozesse." },
    { title: "Welche Mitarbeitergruppen arbeiten später mit der Lösung?", type: "textarea", placeholder: "Sekretariat, Steuerberater, Sachbearbeiter, Lohn etc." },
    { title: "Werden Belege bereits über Unternehmen Online verarbeitet?", type: "textarea", placeholder: "Aktuelle Prozesse und Nutzung beschreiben..." },
    { title: "Wird 'Meine Steuern' aktiv genutzt?", type: "textarea", placeholder: "Aktuelle Nutzung und Prozesse beschreiben..." },
    { title: "Wird DATEV Personalakte eingesetzt?", type: "textarea", placeholder: "Aktuelle Nutzung und Anforderungen beschreiben..." },
    { title: "Wird DATEV DMS genutzt?", type: "textarea", placeholder: "Bestehende DMS-Prozesse beschreiben..." },
    { title: "Wird DATEVconnect & DATEVconnect Dokumentenmanagement vorhanden?", type: "textarea", placeholder: "Muss bestellt werden..." },
    { title: "Welche Dokumente werden unterschrieben?", type: "textarea", placeholder: "Lokal oder digital? Welche Abläufe gibt es?" },
    { title: "Werden externe Signaturen benötigt?", type: "textarea", placeholder: "Wer versendet die Signaturanfragen?" },
    { title: "Ist ein Jahresabschluss-Workflow gewünscht?", type: "textarea", placeholder: "Erstellung → Prüfung → Freigabe → Signatur → Ablage" },
    { title: "Sind mehrere Unterschriften notwendig?", type: "textarea", placeholder: "Einzel- oder Mehrfachsignatur definieren." },
    { title: "Gibt es Freigabestufen?", type: "textarea", placeholder: "Sachbearbeiter → Steuerberater → Mandant" },
    { title: "Wird auftragsbezogen in DATEV DMS abgelegt?", type: "textarea", placeholder: "Bestehende Ablagestruktur beschreiben..." },
    { title: "Ist EO comfort notwendig?", type: "textarea", placeholder: "Anforderungen an auftragsbezogene Steuerung beschreiben..." },
    { title: "Benutzerliste bereitstellen", type: "textarea", placeholder: "Benutzername, Passwort, Zusatz, Gruppen und Rollen definieren." },
    { title: "Signatur-Postfach anlegen", type: "textarea", placeholder: "Empfehlung: signatur@kanzlei.de" },
    { title: "Demo-Account erstellen", type: "textarea", placeholder: "30 Tage Testphase und danach Paketwahl. SignoSign oder FPSign" },
    { title: "Offene Fragen sammeln", type: "textarea", placeholder: "Fehlende Informationen und Zuständigkeiten festhalten." },
    { title: "Technischen Termin planen", type: "textarea", placeholder: "Aufschaltung, Einrichtung und Schulung abstimmen." },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [pwError, setPwError] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleAnswerChange = (value) => {
    setAnswers({ ...answers, [currentStep]: value });
  };

  const handleLogin = () => {
    if (password === APP_PASSWORD) {
      setIsAuthenticated(true);
      setPwError(false);
    } else {
      setPwError(true);
    }
  };

  const exportPDF = async () => {
    setIsExporting(true);
    try {
      const { jsPDF } = await import("jspdf");
      const fileName = answers[0]?.trim() ? answers[0].trim() : "Erstgespräch";
      const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
      const pageW = doc.internal.pageSize.getWidth();
      const pageH = doc.internal.pageSize.getHeight();
      const margin = 15;
      const contentW = pageW - margin * 2;
      let y = margin;

      const addPageIfNeeded = (needed) => {
        if (y + needed > pageH - margin) { doc.addPage(); y = margin; }
      };

      doc.setFillColor(3, 27, 52);
      doc.rect(0, 0, pageW, 28, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.setTextColor(255, 255, 255);
      doc.text("Collect|bar Erstgespräch", margin, 12);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(209, 213, 219);
      doc.text(fileName, margin, 22);
      y = 38;

      questions.forEach((q, index) => {
        const answer = answers[index]?.trim() || "—";
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(3, 27, 52);
        const titleLines = doc.splitTextToSize(`${index + 1}. ${q.title}`, contentW);
        const titleH = titleLines.length * 5;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(17, 24, 39);
        const answerLines = doc.splitTextToSize(answer, contentW - 8);
        const answerH = answerLines.length * 5;
        addPageIfNeeded(titleH + answerH + 14);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(3, 27, 52);
        doc.text(titleLines, margin, y);
        y += titleH + 3;
        doc.setDrawColor(219, 228, 238);
        doc.setFillColor(248, 250, 252);
        doc.roundedRect(margin, y, contentW, answerH + 6, 2, 2, "FD");
        doc.setFillColor(22, 199, 154);
        doc.rect(margin, y, 3, answerH + 6, "F");
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(17, 24, 39);
        doc.text(answerLines, margin + 7, y + 5);
        y += answerH + 6 + 8;
      });

      const totalPages = doc.internal.getNumberOfPages();
      for (let p = 1; p <= totalPages; p++) {
        doc.setPage(p);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(100, 116, 139);
        doc.text(`Seite ${p} von ${totalPages}`, pageW - margin, pageH - 8, { align: "right" });
        doc.text("Collect|bar Erstgespräch", margin, pageH - 8);
      }
      doc.save(`${fileName}.pdf`);
    } catch (err) {
      console.error("PDF export failed:", err);
      alert("PDF-Export fehlgeschlagen: " + err.message);
    } finally {
      setIsExporting(false);
    }
  };

  // ── LOGIN SCREEN ────────────────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        fontFamily: "Arial, sans-serif",
      }}>
        {/* Left – branding panel */}
        <div style={{
          background: "linear-gradient(160deg, #031b34 0%, #0a3d62 60%, #16c79a 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* decorative circles */}
          <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "320px", height: "320px", borderRadius: "50%", background: "rgba(22,199,154,0.12)" }} />
          <div style={{ position: "absolute", bottom: "-60px", left: "-60px", width: "240px", height: "240px", borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ fontSize: "13px", fontWeight: "700", letterSpacing: "3px", color: "#16c79a", marginBottom: "24px", textTransform: "uppercase" }}>
              Digitalbar
            </div>
            <h1 style={{ fontSize: "52px", fontWeight: "800", color: "white", margin: "0 0 8px 0", lineHeight: 1.1 }}>
              Collect<span style={{ color: "#16c79a" }}>|</span>bar
            </h1>
            <p style={{ fontSize: "20px", color: "rgba(255,255,255,0.6)", margin: "0 0 48px 0", fontWeight: "300" }}>
              Erstgespräch
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {["Strukturierter Gesprächsleitfaden", "Automatischer PDF-Export", "Alle Anforderungen auf einen Blick"].map((txt) => (
                <div key={txt} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#16c79a", flexShrink: 0 }} />
                  <span style={{ color: "rgba(255,255,255,0.75)", fontSize: "15px" }}>{txt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right – login panel */}
        <div style={{
          background: "#f8fafc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
        }}>
          <div style={{ width: "100%", maxWidth: "380px" }}>
            <h2 style={{ fontSize: "28px", fontWeight: "700", color: "#0f172a", margin: "0 0 8px 0" }}>
              Willkommen zurück
            </h2>
            <p style={{ color: "#64748b", margin: "0 0 40px 0", fontSize: "15px" }}>
              Bitte melden Sie sich an, um fortzufahren.
            </p>

            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "8px", letterSpacing: "0.03em" }}>
              PASSWORT
            </label>
            <input
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setPwError(false); }}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              style={{
                width: "100%",
                padding: "16px 18px",
                borderRadius: "12px",
                border: pwError ? "2px solid #ef4444" : "2px solid #e2e8f0",
                marginBottom: "8px",
                fontSize: "16px",
                background: "white",
                color: "#0f172a",
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 0.2s",
              }}
            />
            {pwError && (
              <p style={{ color: "#ef4444", fontSize: "13px", margin: "0 0 16px 0" }}>
                Falsches Passwort. Bitte erneut versuchen.
              </p>
            )}

            <button
              onClick={handleLogin}
              style={{
                width: "100%",
                padding: "17px",
                border: "none",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #16c79a, #0ea5e9)",
                color: "white",
                fontSize: "16px",
                fontWeight: "700",
                cursor: "pointer",
                marginTop: pwError ? "0" : "16px",
                letterSpacing: "0.02em",
              }}
            >
              Anmelden →
            </button>

            <p style={{ textAlign: "center", color: "#94a3b8", fontSize: "13px", marginTop: "32px" }}>
              Collect|bar © {new Date().getFullYear()} Digitalbar
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── MAIN APP ────────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", background: "#edf2f7", padding: "40px", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: "950px", margin: "0 auto", background: "#ffffff", borderRadius: "24px", overflow: "hidden", boxShadow: "0 10px 40px rgba(0,0,0,0.08)" }}>

        <div style={{ background: "linear-gradient(135deg, #031b34 0%, #0a2f4f 100%)", padding: "40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ color: "white", fontSize: "42px", fontWeight: "700", margin: "0 0 10px 0" }}>
              Collect<span style={{ color: "#16c79a" }}>|</span>bar Erstgespräch
            </h1>
            <p style={{ color: "#d1d5db", fontSize: "18px", margin: 0 }}>Interaktiver Gesprächsleitfaden</p>
          </div>
          <button onClick={exportPDF} disabled={isExporting} style={{ background: isExporting ? "#94a3b8" : "#16c79a", color: "white", border: "none", padding: "16px 28px", borderRadius: "14px", fontSize: "16px", fontWeight: "600", cursor: isExporting ? "not-allowed" : "pointer" }}>
            {isExporting ? "Wird erstellt..." : "PDF speichern"}
          </button>
        </div>

        <div style={{ padding: "40px" }}>
          <div style={{ marginBottom: "35px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
              <span style={{ fontWeight: "600", color: "#0f172a" }}>Schritt {currentStep + 1} von {questions.length}</span>
              <span style={{ color: "#64748b" }}>{questions[currentStep].title}</span>
            </div>
            <div style={{ width: "100%", height: "10px", background: "#e2e8f0", borderRadius: "999px" }}>
              <div style={{ width: `${((currentStep + 1) / questions.length) * 100}%`, height: "100%", background: "#16c79a", borderRadius: "999px", transition: "0.3s ease" }} />
            </div>
          </div>

          <div style={{ background: "#ffffff", border: "1px solid #dbe4ee", borderRadius: "22px", overflow: "hidden" }}>
            <div style={{ padding: "28px 32px", borderBottom: "1px solid #e5e7eb", background: "#f8fafc" }}>
              <h2 style={{ margin: 0, fontSize: "32px", color: "#0f172a", fontWeight: "700" }}>
                {questions[currentStep].title}
              </h2>
            </div>
            <div style={{ padding: "35px" }}>
              {questions[currentStep].type === "input" ? (
                <input type="text" value={answers[currentStep] || ""} onChange={(e) => handleAnswerChange(e.target.value)} placeholder={questions[currentStep].placeholder}
                  style={{ width: "100%", padding: "20px", borderRadius: "16px", border: "1px solid #cbd5e1", fontSize: "18px", background: "#f8fafc", color: "#111827", outline: "none", boxSizing: "border-box" }} />
              ) : (
                <textarea value={answers[currentStep] || ""} onChange={(e) => handleAnswerChange(e.target.value)} placeholder={questions[currentStep].placeholder}
                  style={{ width: "100%", minHeight: "260px", borderRadius: "16px", border: "1px solid #cbd5e1", padding: "20px", fontSize: "16px", resize: "vertical", background: "#f8fafc", color: "#111827", outline: "none", boxSizing: "border-box" }} />
              )}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "35px" }}>
            <button onClick={() => setCurrentStep(currentStep - 1)} disabled={currentStep === 0}
              style={{ padding: "16px 26px", borderRadius: "14px", border: "none", background: currentStep === 0 ? "#cbd5e1" : "#031b34", color: "white", cursor: currentStep === 0 ? "not-allowed" : "pointer", fontSize: "16px", fontWeight: "600" }}>
              Zurück
            </button>
            {currentStep === questions.length - 1 ? (
              <button onClick={exportPDF} disabled={isExporting}
                style={{ padding: "16px 26px", borderRadius: "14px", border: "none", background: isExporting ? "#94a3b8" : "#16c79a", color: "white", cursor: isExporting ? "not-allowed" : "pointer", fontSize: "16px", fontWeight: "700" }}>
                {isExporting ? "Wird erstellt..." : "PDF erstellen"}
              </button>
            ) : (
              <button onClick={() => setCurrentStep(currentStep + 1)} disabled={!answers[currentStep]?.trim()}
                style={{ padding: "16px 26px", borderRadius: "14px", border: "none", background: !answers[currentStep]?.trim() ? "#94a3b8" : "#16c79a", color: "white", cursor: !answers[currentStep]?.trim() ? "not-allowed" : "pointer", fontSize: "16px", fontWeight: "700" }}>
                Weiter
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
