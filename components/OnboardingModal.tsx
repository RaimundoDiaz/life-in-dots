"use client";

import { Modal } from "./Modal";
import { useAppStore } from "@/lib/store";
import { Check, Calendar, ChartLine } from "lucide-react";

type Props = {
  open: boolean;
};

export function OnboardingModal({ open }: Props) {
  const step = useAppStore((s) => s.onboardingStep);
  const setStep = useAppStore((s) => s.setOnboardingStep);
  const finish = useAppStore((s) => s.finishOnboarding);
  const userName = useAppStore((s) => s.userName);

  const steps: { node: React.ReactNode }[] = [
    {
      node: (
        <Step
          icon={<span className="text-3xl">👋</span>}
          title={`¡Bienvenida${userName ? `, ${userName.split(" ")[0]}` : ""}!`}
          body="Vamos a hacer un recorrido rápido para que conozcas cómo usar tu calendario de 2026."
          primaryLabel="Comenzar"
          secondaryLabel="Saltar tutorial"
          onPrimary={() => setStep(1)}
          onSecondary={finish}
          stepIdx={0}
          totalSteps={5}
        />
      ),
    },
    {
      node: (
        <Step
          icon={<CalendarIcon />}
          title="Este es tu calendario anual"
          body="Cada punto representa un día de 2026. Al final del año, verás todos tus logros en un solo vistazo."
          primaryLabel="Siguiente"
          secondaryLabel="Atrás"
          onPrimary={() => setStep(2)}
          onSecondary={() => setStep(0)}
          stepIdx={1}
          totalSteps={5}
        />
      ),
    },
    {
      node: (
        <Step
          icon={
            <span className="w-9 h-9 rounded bg-success flex items-center justify-center">
              <Check className="text-white" size={20} strokeWidth={3} />
            </span>
          }
          title="Aquí defines tus metas diarias"
          body={
            <>
              Agrega las metas para cada día y márcalas cuando las completes.<br />
              Ejemplo: &ldquo;Hacer ejercicio 30 minutos&rdquo;
            </>
          }
          primaryLabel="Siguiente"
          secondaryLabel="Atrás"
          onPrimary={() => setStep(3)}
          onSecondary={() => setStep(1)}
          stepIdx={2}
          totalSteps={5}
        />
      ),
    },
    {
      node: <DayStatesStep onNext={() => setStep(4)} onBack={() => setStep(2)} />,
    },
    {
      node: (
        <Step
          icon={null}
          title="Tu perfil"
          body="Aquí puedes editar tu información y elegir personas que te inspiran para recibir frases motivacionales."
          primaryLabel="¡Comenzar!"
          onPrimary={finish}
          stepIdx={4}
          totalSteps={5}
          centered
        />
      ),
    },
  ];

  return (
    <Modal open={open} closeOnBackdrop={false} width={520}>
      {steps[step]?.node}
    </Modal>
  );
}

function Step({
  icon,
  title,
  body,
  primaryLabel,
  secondaryLabel,
  onPrimary,
  onSecondary,
  stepIdx,
  totalSteps,
  centered,
}: {
  icon: React.ReactNode;
  title: string;
  body: React.ReactNode;
  primaryLabel: string;
  secondaryLabel?: string;
  onPrimary: () => void;
  onSecondary?: () => void;
  stepIdx: number;
  totalSteps: number;
  centered?: boolean;
}) {
  return (
    <div className="p-8 flex flex-col items-center gap-5 text-center">
      {icon && <div>{icon}</div>}
      <h3 className="font-serif text-2xl text-black">{title}</h3>
      <p className="text-sm text-muted max-w-sm">{body}</p>

      <div className="flex gap-3 w-full justify-center mt-2">
        {secondaryLabel && (
          <button
            type="button"
            onClick={onSecondary}
            className="flex-1 max-w-[180px] border border-line bg-white rounded-lg py-2.5 text-sm font-medium text-black hover:bg-surface transition-colors"
          >
            {secondaryLabel}
          </button>
        )}
        <button
          type="button"
          onClick={onPrimary}
          className={`${centered ? "w-full" : "flex-1 max-w-[180px]"} bg-black text-white rounded-lg py-2.5 text-sm font-medium hover:bg-gray-800 transition-colors`}
        >
          {primaryLabel}
        </button>
      </div>

      <Dots step={stepIdx} total={totalSteps} />
    </div>
  );
}

function Dots({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex gap-1.5 mt-1">
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={`w-1.5 h-1.5 rounded-full ${
            i === step ? "bg-black" : "bg-line"
          }`}
        />
      ))}
    </div>
  );
}

function CalendarIcon() {
  return (
    <div className="w-10 h-10 border-2 border-black rounded flex flex-col items-center justify-center bg-white">
      <span className="text-[6px] font-bold text-danger leading-none mt-0.5">
        ABR
      </span>
      <span className="text-xs font-bold text-black leading-none">25</span>
    </div>
  );
}

function DayStatesStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const items: { color: string; ring?: string; title: string; subtitle: string }[] = [
    { color: "bg-black", title: "Día cumplido", subtitle: "Completaste todas tus metas" },
    { color: "bg-danger", title: "Día parcialmente cumplido", subtitle: "Completaste algunas metas" },
    { color: "bg-white border-2 border-danger", title: "Día perdido", subtitle: "No cumpliste ninguna meta" },
    { color: "bg-success", title: "Hoy", subtitle: "¡Aún puedes lograrlo!" },
  ];
  return (
    <div className="p-8 flex flex-col gap-4">
      <h3 className="font-serif text-2xl text-black text-center">Entiende tus días</h3>
      <div className="flex flex-col gap-2 mt-2">
        {items.map((it, i) => (
          <div key={i} className="flex items-center gap-4 p-3 rounded-lg border border-line">
            <span className={`w-4 h-4 rounded-full ${it.color}`} />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-black">{it.title}</span>
              <span className="text-xs text-muted">{it.subtitle}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-3 mt-4">
        <button
          onClick={onBack}
          className="flex-1 border border-line bg-white rounded-lg py-2.5 text-sm font-medium text-black hover:bg-surface"
        >
          Atrás
        </button>
        <button
          onClick={onNext}
          className="flex-1 bg-black text-white rounded-lg py-2.5 text-sm font-medium hover:bg-gray-800"
        >
          Siguiente
        </button>
      </div>
      <Dots step={3} total={5} />
    </div>
  );
}
