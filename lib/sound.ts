// Lightweight Web Audio API Synthesizer for Cosmic Sound Effects
// Works without any external audio files / assets

class CosmicAudioEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = false;

  private initCtx() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public toggleSound(force?: boolean): boolean {
    this.enabled = force !== undefined ? force : !this.enabled;
    if (this.enabled) {
      this.initCtx();
      this.playChime(587.33, 0.15); // D5
    }
    return this.enabled;
  }

  public playChime(freq: number = 528, duration: number = 0.6) {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, this.ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  public playSuccessTone() {
    if (!this.enabled) return;
    const chords = [523.25, 659.25, 783.99, 1046.5]; // C major cosmic chord
    chords.forEach((freq, idx) => {
      setTimeout(() => {
        this.playChime(freq, 0.8);
      }, idx * 120);
    });
  }

  public playHoverTone() {
    if (!this.enabled) return;
    this.playChime(440, 0.1);
  }
}

export const cosmicAudio = new CosmicAudioEngine();
