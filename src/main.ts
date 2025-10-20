    class RotatingTriangle {
      private ctx: CanvasRenderingContext2D;
      angle = 0;
      speed = 1;
      size = 160;
      color = '#ff6b6b';

      constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
      }

      update(dt: number, speedMultiplier: number) {
        this.angle += dt * this.speed * speedMultiplier;
      }

      draw() {
        const ctx = this.ctx;
        const canvas = ctx.canvas;
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        const cx = w / 2;
        const cy = h / 2;

        ctx.clearRect(0, 0, w, h);

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(this.angle);

        const s = this.size;
        ctx.beginPath();
        ctx.moveTo(0, -s);
        ctx.lineTo(s * Math.sin(Math.PI / 3), s * Math.cos(Math.PI / 3));
        ctx.lineTo(-s * Math.sin(Math.PI / 3), s * Math.cos(Math.PI / 3));
        ctx.closePath();

        ctx.fillStyle = this.color;
        ctx.fill();

        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgba(0,0,0,0.12)';
        ctx.stroke();

        ctx.restore();
      }
    }

    function setup() {
      const canvas = document.getElementById('canvas') as HTMLCanvasElement;
      const ctx = canvas.getContext('2d')!;
      const dpr = Math.max(window.devicePixelRatio || 1, 1);

      const speedEl = document.getElementById('speed') as HTMLInputElement;
      const sizeEl = document.getElementById('size') as HTMLInputElement;
      const colorEl = document.getElementById('color') as HTMLInputElement;
      const pauseBtn = document.getElementById('pause') as HTMLButtonElement;
      const resetBtn = document.getElementById('reset') as HTMLButtonElement;

      function resizeCanvas() {
        const cssW = canvas.clientWidth;
        const cssH = canvas.clientHeight;
        canvas.width = Math.round(cssW * dpr);
        canvas.height = Math.round(cssH * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      const tri = new RotatingTriangle(ctx);
      let last = performance.now();
      let running = true;

      function frame(now: number) {
        if (!running) { last = now; requestAnimationFrame(frame); return; }
        const dt = (now - last) / 1000;
        last = now;

        tri.size = parseFloat(sizeEl.value);
        tri.color = colorEl.value;
        tri.update(dt, parseFloat(speedEl.value));
        tri.draw();

        requestAnimationFrame(frame);
      }

      pauseBtn.addEventListener('click', () => {
        running = !running;
        pauseBtn.textContent = running ? '一時停止' : '再開';
      });

      resetBtn.addEventListener('click', () => {
        tri.angle = 0;
        tri.draw();
      });

      window.addEventListener('resize', () => {
        resizeCanvas();
        tri.draw();
      });

      window.addEventListener('keydown', e => {
        if (e.code === 'Space') {
          e.preventDefault();
          running = !running;
          pauseBtn.textContent = running ? '一時停止' : '再開';
        }
      });

      resizeCanvas();
      requestAnimationFrame(frame);
    }

    window.addEventListener('load', setup);