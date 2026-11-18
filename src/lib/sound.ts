"use client";

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctx) return null;
  if (!audioCtx) {
    audioCtx = new Ctx();
  }
  if (audioCtx.state === "suspended") {
    void audioCtx.resume();
  }
  return audioCtx;
}

function playTone(
  frequency: number,
  durationSec: number,
  type: OscillatorType = "sine",
  gainPeak = 0.045,
  delaySec = 0
) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const start = ctx.currentTime + delaySec;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(frequency, start);

  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(gainPeak, start + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + durationSec);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(start);
  osc.stop(start + durationSec + 0.02);
}

export function playSelectChime(enabled: boolean) {
  if (!enabled) return;
  playTone(520, 0.11, "sine", 0.04, 0);
  playTone(780, 0.14, "triangle", 0.035, 0.055);
}

export function playPanelClose(enabled: boolean) {
  if (!enabled) return;
  playTone(440, 0.09, "sine", 0.03, 0);
  playTone(320, 0.1, "sine", 0.025, 0.04);
}

export function playTourStep(enabled: boolean) {
  if (!enabled) return;
  playTone(620, 0.12, "triangle", 0.035, 0);
}

export function playDiscoveryComplete(enabled: boolean) {
  if (!enabled) return;
  playTone(523.25, 0.12, "triangle", 0.04, 0);
  playTone(659.25, 0.12, "triangle", 0.04, 0.08);
  playTone(783.99, 0.18, "triangle", 0.045, 0.16);
}
