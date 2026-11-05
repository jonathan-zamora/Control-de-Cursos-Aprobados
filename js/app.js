/* Control de Cursos Aprobados · FIUSAC
   Lógica de la aplicación: estados, créditos, promedio y persistencia. */
(function () {
  'use strict';

  const hasData = typeof CAREERS !== 'undefined' && typeof ALL_COURSES !== 'undefined';
  const CAREER_IDS = hasData ? Object.keys(CAREERS) : [];
  const STORAGE_KEY = 'control-cursos-fiusac:v1';
  const RING_CIRCUMFERENCE = 376.99;
  const FILTER_LABELS = {
    all: 'todos',
    approved: 'aprobados',
    available: 'disponibles',
    locked: 'bloqueados',
    failed: 'reprobados'
  };
  const STATUS_META = {
    approved: { label: 'Aprobado', icon: 'check' },
    available: { label: 'Disponible', icon: 'clock' },
    locked: { label: 'Bloqueado', icon: 'lock' },
    failed: { label: 'Reprobado', icon: 'alertTriangle' }
  };

  /* ---------- Iconos ---------- */
  const ICONS = {
    arrowRight: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
    code: '<path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/>',
    factory: '<path d="M2 20h20"/><path d="M4 20V9l6 4V9l6 4V4h4v16"/>',
    sparkles: '<path d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9Z"/><path d="M5 3v4"/><path d="M3 5h4"/><path d="M19 17v4"/><path d="M17 19h4"/>',
    chart: '<path d="M3 3v18h18"/><path d="M7 15v3"/><path d="M12 9v9"/><path d="M17 5v13"/>',
    download: '<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>',
    upload: '<path d="M12 21V9"/><path d="m7 14 5-5 5 5"/><path d="M5 3h14"/>',
    printer: '<path d="M6 9V3h12v6"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8" rx="1"/>',
    refresh: '<path d="M3 12a9 9 0 0 1 15.5-6.3L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15.5 6.3L3 16"/><path d="M3 21v-5h5"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    trash: '<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v5"/><path d="M14 11v5"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 8h.01"/>',
    graduation: '<path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5"/><path d="M22 10v6"/>',
    copy: '<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    check: '<path d="m5 12 5 5L20 7"/>',
    lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    alertTriangle: '<path d="M10.3 3.9 2.5 17.4A2 2 0 0 0 4.2 20h15.6a2 2 0 0 0 1.7-2.6L13.7 3.9a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>'
  };

  /* ---------- Estado ---------- */
  const COURSE_INDEX = {};
  const state = {
    career: null,
    lastCareer: null,
    filter: 'all',
    query: '',
    progress: emptyProgress(),
    pendingUnlock: null,
    toastTimer: null,
    lastFocus: null,
    storageWarned: false
  };

  let saveTimer = null;
  let printPrev = null;

  /* ---------- Utilidades ---------- */
  function $(selector, root) {
    return (root || document).querySelector(selector);
  }

  function $$(selector, root) {
    return Array.from((root || document).querySelectorAll(selector));
  }

  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  }

  function svg(name) {
    const body = ICONS[name] || ICONS.info;
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + body + '</svg>';
  }

  function normalizeText(value) {
    return String(value == null ? '' : value)
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  }

  function plural(count, one, many) {
    return count === 1 ? one : many;
  }

  function formatAverage(value) {
    return value == null ? '—' : Number(value).toFixed(2);
  }

  function formatDateLong(date) {
    try {
      return new Intl.DateTimeFormat('es-GT', { dateStyle: 'long' }).format(date);
    } catch (error) {
      return date.toLocaleDateString();
    }
  }

  function todayStamp() {
    const date = new Date();
    const pad = function (n) { return String(n).padStart(2, '0'); };
    return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate());
  }

  function emptyProgress() {
    const progress = {};
    CAREER_IDS.forEach(function (id) { progress[id] = {}; });
    return progress;
  }

  function parseGrade(value) {
    const raw = String(value == null ? '' : value).trim().replace(',', '.');
    if (!raw) return null;
    if (!/^\d+(\.\d+)?$/.test(raw)) return undefined;
    const number = Number(raw);
    if (!Number.isFinite(number) || number < 0 || number > 100) return undefined;
    return Math.round(number * 100) / 100;
  }

  function normalizeGrade(value) {
    if (value == null || value === '') return null;
    const number = typeof value === 'number' ? value : Number(String(value).replace(',', '.'));
    if (!Number.isFinite(number) || number < 0 || number > 100) return undefined;
    return Math.round(number * 100) / 100;
  }

  /* ---------- Índices y estadísticas ---------- */
  function buildIndex() {
    CAREER_IDS.forEach(function (id) {
      COURSE_INDEX[id] = new Map(ALL_COURSES[id].map(function (course) {
        return [course.code, course];
      }));
    });
  }

  function computeStats(id) {
    const career = CAREERS[id];
    const target = career.targetCredits || 300;
    const progress = state.progress[id] || {};
    const approved = [];
    const failed = [];
    const available = [];
    const locked = [];
    const approvedSet = new Set();
    const failedSet = new Set();
    const availableSet = new Set();

    ALL_COURSES[id].forEach(function (course) {
      if (progress[course.code] && progress[course.code].status === 'approved') {
        approved.push(course);
        approvedSet.add(course.code);
      }
    });

    ALL_COURSES[id].forEach(function (course) {
      if (approvedSet.has(course.code)) return;
      const record = progress[course.code];
      const unlocked = course.prereqs.every(function (code) {
        return approvedSet.has(code);
      });
      if (record && record.status === 'failed') {
        failed.push(course);
        failedSet.add(course.code);
      } else if (unlocked) {
        available.push(course);
        availableSet.add(course.code);
      } else {
        locked.push(course);
      }
    });

    let credits = 0;
    let gradedCredits = 0;
    let weightedSum = 0;
    let simpleSum = 0;
    let gradedCount = 0;
    let gradeableCount = 0;

    approved.forEach(function (course) {
      credits += course.credits;
      if (course.credits > 0) {
        gradeableCount += 1;
        const grade = progress[course.code] && progress[course.code].grade;
        if (typeof grade === 'number') {
          gradedCount += 1;
          gradedCredits += course.credits;
          weightedSum += grade * course.credits;
          simpleSum += grade;
        }
      }
    });

    const practices = ALL_COURSES[id].filter(function (course) { return course.credits === 0; });
    const practicesDone = practices.filter(function (course) { return approvedSet.has(course.code); }).length;

    return {
      approved: approved,
      failed: failed,
      available: available,
      locked: locked,
      approvedSet: approvedSet,
      failedSet: failedSet,
      availableSet: availableSet,
      approvedCount: approved.length,
      failedCount: failed.length,
      availableCount: available.length,
      lockedCount: locked.length,
      credits: credits,
      target: target,
      remaining: Math.max(0, target - credits),
      pct: target > 0 ? Math.min(100, (credits / target) * 100) : 0,
      gradedCount: gradedCount,
      gradeableCount: gradeableCount,
      gradedCredits: gradedCredits,
      weighted: gradedCredits > 0 ? weightedSum / gradedCredits : null,
      simple: gradedCount > 0 ? simpleSum / gradedCount : null,
      practicesTotal: practices.length,
      practicesDone: practicesDone
    };
  }

  function statusFor(stats, code) {
    if (stats.approvedSet.has(code)) return 'approved';
    if (stats.failedSet.has(code)) return 'failed';
    if (stats.availableSet.has(code)) return 'available';
    return 'locked';
  }

  /* ---------- Persistencia ---------- */
  function sanitizeProgress(raw) {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
    const progress = emptyProgress();
    let count = 0;

    CAREER_IDS.forEach(function (id) {
      const source = raw[id];
      if (!source || typeof source !== 'object' || Array.isArray(source)) return;
      const valid = COURSE_INDEX[id];
      Object.keys(source).forEach(function (code) {
        if (!valid || !valid.has(code)) return;
        const record = source[code];
        if (!record || typeof record !== 'object') return;
        if (record.status !== 'approved' && record.status !== 'failed') return;
        const clean = { status: record.status };
        const grade = normalizeGrade(record.grade);
        if (grade != null) clean.grade = grade;
        progress[id][code] = clean;
        count += 1;
      });
    });

    return { progress: progress, count: count };
  }

  function loadState() {
    let raw = null;
    try {
      raw = localStorage.getItem(STORAGE_KEY);
    } catch (error) {
      return;
    }
    if (!raw) return;
    try {
      const payload = JSON.parse(raw);
      const source = payload && payload.progress ? payload.progress : payload;
      const clean = sanitizeProgress(source);
      if (clean) state.progress = clean.progress;
      if (payload && CAREER_IDS.indexOf(payload.career) !== -1) state.lastCareer = payload.career;
    } catch (error) {
      console.warn('No se pudo leer el progreso guardado.', error);
    }
  }

  function writeStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        version: 1,
        career: state.career || state.lastCareer || null,
        progress: state.progress,
        updatedAt: new Date().toISOString()
      }));
      return true;
    } catch (error) {
      return false;
    }
  }

  function saveState(options) {
    const silent = options && options.silent;
    const ok = writeStorage();

    if (!ok && !state.storageWarned) {
      state.storageWarned = true;
      showToast('No pudimos guardar en este navegador. Exportá tu progreso como respaldo.', 'error');
    }
    if (silent) return ok;

    const status = $('#saveStatus');
    if (!status) return ok;
    const text = $('.save-text', status);
    status.classList.add('saving');
    if (text) text.textContent = 'Guardando…';
    clearTimeout(saveTimer);
    saveTimer = setTimeout(function () {
      status.classList.remove('saving');
      if (text) text.textContent = ok ? 'Guardado' : 'Sin guardar';
    }, 550);
    return ok;
  }

  /* ---------- Toasts y modal ---------- */
  function showToast(message, type) {
    const toast = $('#toast');
    const icon = $('#toastIcon');
    const text = $('#toastMessage');
    if (!toast || !icon || !text) return;

    const kind = type || 'success';
    toast.className = 'toast' + (kind === 'warn' ? ' warn' : kind === 'error' ? ' error' : '');
    icon.innerHTML = svg(kind === 'warn' || kind === 'error' ? 'alertTriangle' : kind === 'info' ? 'info' : 'check');
    text.textContent = message;

    void toast.offsetWidth;
    toast.classList.add('show');
    clearTimeout(state.toastTimer);
    state.toastTimer = setTimeout(function () {
      toast.classList.remove('show');
    }, 3800);
  }

  function openModal() {
    const modal = $('#modal');
    if (!modal || !state.career) return;
    state.lastFocus = document.activeElement;
    $('#modalTitle').textContent = 'Reiniciar progreso';
    $('#modalText').textContent = 'Se van a borrar los cursos aprobados, las notas y los cursos reprobados de ' +
      CAREERS[state.career].name + '. Esta acción no se puede deshacer.';
    $('#modalConfirm').textContent = 'Sí, reiniciar';
    modal.hidden = false;
    $('#modalCancel').focus();
  }

  function closeModal() {
    const modal = $('#modal');
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    const focus = state.lastFocus;
    state.lastFocus = null;
    if (focus && typeof focus.focus === 'function') focus.focus();
  }

  function confirmReset() {
    if (!state.career) {
      closeModal();
      return;
    }
    state.progress[state.career] = {};
    saveState();
    closeModal();
    renderDashboard();
    showToast('Progreso reiniciado. Podés empezar de nuevo.');
  }

  /* ---------- Render: cabecera y leyendas ---------- */
  function areaEntries(career) {
    const entries = Object.keys(career.areas).map(function (key) {
      return { name: career.areas[key].name, color: career.areas[key].color };
    });
    entries.push({ name: 'Área general', color: '#cbd5c8' });
    return entries;
  }

  function creditsNote(career) {
    const isSystems = career.id === 'sistemas';
    const seminar = isSystems
      ? 'Seminario de Investigación (0799) o su variante E.P.S. (7999)'
      : 'Seminario de Investigación Industrial (7905) o su variante E.P.S. (7985)';
    const practices = isSystems
      ? 'Prácticas Iniciales (2025), Intermedias (2036) y Finales (2009)'
      : 'Prácticas Iniciales (2025), Intermedias (2036) y Finales (2005)';
    return 'La red de estudios suma ' + career.planCredits + ' créditos, pero el pensum se cierra con ' +
      (career.targetCredits || 300) + ' CLAR; cada semestre equivale a 30 CLAR. Las ' + practices +
      ' son de 0 créditos, se asignan en la Unidad de EPS y no afectan el promedio. Para cerrar pensum tenés que aprobar ' +
      seminar + '. Además, el Área Social Humanística exige 8 de los 10 CLAR disponibles.';
  }

  function renderCareerHeader(id) {
    const career = CAREERS[id];
    $('#careerPensum').textContent = 'Pensum ' + career.pensum + ' · ' + career.totalCourses + ' cursos';
    $('#careerTitle').textContent = career.name;
    $('#careerDescription').textContent = career.description;
    $('#creditsNote').textContent = creditsNote(career);

    const entries = areaEntries(career);
    $('#areaLegend').innerHTML = entries.map(function (area) {
      return '<span class="area-pill"><i style="background:' + esc(area.color) + '"></i>' + esc(area.name) + '</span>';
    }).join('');
    $('#areaLegendInline').innerHTML = entries.map(function (area) {
      return '<span class="legend-dot"><i style="background:' + esc(area.color) + '"></i>' + esc(area.name) + '</span>';
    }).join('');
  }

  /* ---------- Render: tarjetas de curso ---------- */
  function prereqLine(course, stats) {
    if (!course.prereqs.length) {
      return '<div class="prereq-line ok">' + svg('check') + ' <span>Sin prerrequisitos</span></div>';
    }
    const missing = course.prereqs.filter(function (code) {
      return !stats.approvedSet.has(code);
    });
    const hasFailed = course.prereqs.some(function (code) {
      return stats.failedSet.has(code);
    });
    const modifier = missing.length ? (hasFailed ? 'fail' : 'locked') : 'ok';
    const icon = missing.length ? (hasFailed ? 'alertTriangle' : 'lock') : 'check';
    const shown = missing.length ? missing : course.prereqs;
    const label = missing.length ? 'Faltan:' : 'Prerrequisitos:';
    const pills = shown.map(function (code) {
      const done = stats.approvedSet.has(code);
      return '<span class="code-pill" title="' + (done ? 'Aprobado' : 'Pendiente') + '">' + esc(code) + '</span>';
    }).join(' ');
    return '<div class="prereq-line ' + modifier + '">' + svg(icon) + ' <span>' + label + '</span> ' + pills + '</div>';
  }

  function courseActions(course, status) {
    const code = esc(course.code);
    const isPractice = course.credits === 0;

    if (status === 'locked') {
      return '<div class="course-actions locked-actions"><span class="lock-hint">' + svg('lock') +
        ' Aprobá los prerrequisitos para habilitarlo</span></div>';
    }

    if (status === 'approved') {
      const record = (state.progress[state.career] && state.progress[state.career][course.code]) || {};
      const gradeField = isPractice ? '' :
        '<label class="grade-field" title="Nota de 0 a 100"><span>Nota</span>' +
        '<input type="number" inputmode="decimal" min="0" max="100" step="0.01" data-grade-input data-code="' + code +
        '" value="' + (record.grade != null ? esc(record.grade) : '') + '" placeholder="—" aria-label="Nota de ' +
        esc(course.name) + '"></label>';
      const hint = isPractice
        ? '<span class="lock-hint">' + svg('info') + ' No afecta el promedio</span>'
        : '';
      return '<div class="course-actions">' + gradeField + hint +
        '<button class="btn btn-ghost btn-xs" type="button" data-action="clear" data-code="' + code + '">' +
        svg('x') + ' Quitar</button></div>';
    }

    if (status === 'failed') {
      return '<div class="course-actions">' +
        '<button class="btn btn-primary btn-xs" type="button" data-action="approve" data-code="' + code + '">' +
        svg('check') + ' Aprobar</button>' +
        '<button class="btn btn-ghost btn-xs" type="button" data-action="clear" data-code="' + code + '">' +
        svg('x') + ' Quitar</button></div>';
    }

    return '<div class="course-actions">' +
      '<button class="btn btn-primary btn-xs" type="button" data-action="approve" data-code="' + code + '">' +
      svg('check') + ' Aprobar</button>' +
      '<button class="btn btn-ghost btn-xs btn-fail" type="button" data-action="fail" data-code="' + code + '">' +
      svg('x') + ' Reprobar</button></div>';
  }

  function courseCard(course, career, status, stats) {
    const area = course.area ? career.areas[course.area] : null;
    const color = area ? area.color : '#cbd5c8';
    const isPractice = course.credits === 0;
    const meta = STATUS_META[status];
    const pending = state.pendingUnlock && state.pendingUnlock.has(course.code);
    let title = course.name;
    if (status === 'available') title = 'Clic para aprobar ' + course.name;
    else if (status === 'failed') title = 'Clic para aprobar de nuevo ' + course.name;
    else if (status === 'locked') title = 'Aprobá los prerrequisitos para habilitar este curso';

    return '<article class="course-card status-' + status + (pending ? ' just-unlocked' : '') +
      '" data-code="' + esc(course.code) + '" data-status="' + status + '" style="--area: ' + esc(color) +
      '" title="' + esc(title) + '">' +
      '<span class="course-area" aria-hidden="true"></span>' +
      '<div class="course-main">' +
        '<div class="course-top">' +
          '<span class="course-code">' + esc(course.code) + '</span>' +
          '<span class="course-credits">' + course.credits + ' ' + plural(course.credits, 'crédito', 'créditos') + '</span>' +
          (isPractice ? '<span class="practice-chip">Práctica</span>' : '') +
          '<span class="course-status">' + svg(meta.icon) + ' ' + meta.label + '</span>' +
        '</div>' +
        '<h4 class="course-name">' + esc(course.name) + '</h4>' +
        (area ? '<div class="course-meta"><span class="area-chip"><i style="background:' + esc(color) + '"></i>' +
          esc(area.name) + '</span></div>' : '') +
        prereqLine(course, stats) +
        courseActions(course, status) +
      '</div>' +
    '</article>';
  }

  /* ---------- Render: malla curricular ---------- */
  function updateToolbarHint(visibleCount) {
    const hint = $('#toolbarHint');
    if (!hint) return;
    const query = state.query.trim();
    if (query) {
      hint.textContent = 'Mostrando ' + visibleCount + ' ' + plural(visibleCount, 'curso', 'cursos') +
        ' para “' + query + '”.';
    } else if (state.filter !== 'all') {
      hint.textContent = 'Mostrando ' + visibleCount + ' ' + plural(visibleCount, 'curso', 'cursos') +
        ' en ' + FILTER_LABELS[state.filter] + '.';
    } else {
      hint.textContent = 'Hacé clic en un curso disponible para aprobarlo.';
    }
  }

  function renderPensum(stats) {
    const career = CAREERS[state.career];
    const grid = $('#pensumGrid');
    if (!career || !grid) return;

    const query = normalizeText(state.query);
    const filter = state.filter;
    const parts = [];
    let visibleCount = 0;

    career.semesters.forEach(function (semester) {
      const visible = semester.courses.filter(function (course) {
        const status = statusFor(stats, course.code);
        if (filter !== 'all' && status !== filter) return false;
        if (query) {
          const haystack = normalizeText(course.name) + ' ' + course.code;
          if (haystack.indexOf(query) === -1) return false;
        }
        return true;
      });
      if (!visible.length) return;
      visibleCount += visible.length;

      const approvedCount = semester.courses.filter(function (course) {
        return stats.approvedSet.has(course.code);
      }).length;
      const semesterCredits = semester.courses.reduce(function (total, course) {
        return total + course.credits;
      }, 0);

      parts.push(
        '<section class="semester-card" aria-label="' + esc(semester.label) + '">' +
          '<header class="semester-header">' +
            '<span class="semester-number">' + semester.number + '</span>' +
            '<div class="semester-title"><h3>Semestre ' + semester.number + '</h3>' +
              '<span>' + semester.courses.length + ' cursos · ' + semesterCredits + ' créditos</span></div>' +
            '<span class="semester-count" title="' + approvedCount + ' de ' + semester.courses.length +
              ' aprobados">' + approvedCount + '/' + semester.courses.length + '</span>' +
          '</header>' +
          '<div class="semester-courses">' +
            visible.map(function (course) {
              return courseCard(course, career, statusFor(stats, course.code), stats);
            }).join('') +
          '</div>' +
        '</section>'
      );
    });

    if (!parts.length) {
      parts.push(
        '<div class="pensum-empty">' +
          '<strong>No encontramos cursos con ese filtro.</strong>' +
          '<span>Probá con otro término de búsqueda o volvé a “Todos”.</span>' +
        '</div>'
      );
    }

    grid.innerHTML = parts.join('');
    state.pendingUnlock = null;
    updateToolbarHint(visibleCount);
  }

  /* ---------- Render: resumen ---------- */
  function updateSummary(stats) {
    const career = CAREERS[state.career];
    if (!career) return;

    $('#statCredits').textContent = stats.credits;
    $('#statRemaining').textContent = stats.remaining;
    $('#statApproved').textContent = stats.approvedCount;
    $('#statApprovedSub').textContent = 'de ' + career.totalCourses;

    const ringPct = $('#ringPct');
    ringPct.textContent = Math.round(stats.pct) + '%';
    const ringFill = $('#ringFill');
    if (ringFill) ringFill.style.strokeDashoffset = String(RING_CIRCUMFERENCE * (1 - stats.pct / 100));

    const progressFill = $('#progressFill');
    if (progressFill) progressFill.style.width = stats.pct + '%';
    const progressBar = $('#progressBar');
    if (progressBar) progressBar.setAttribute('aria-valuenow', String(Math.round(stats.pct)));

    const practices = stats.practicesTotal
      ? ' Prácticas: ' + stats.practicesDone + ' de ' + stats.practicesTotal + ' aprobadas.'
      : '';
    let note;
    if (stats.credits >= stats.target) {
      note = '¡Completaste los ' + stats.target + ' créditos CLAR! Revisá los requisitos de graduación.' + practices;
    } else {
      note = 'Te faltan ' + stats.remaining + ' ' + plural(stats.remaining, 'crédito', 'créditos') +
        ' para llegar a ' + stats.target + ' CLAR.' + practices;
    }
    $('#summaryNote').textContent = note;
  }

  function updateAverageCard(stats) {
    const average = formatAverage(stats.weighted);
    $('#averageValue').textContent = average;
    $('#averageCount').textContent = stats.gradedCount;
    $('#averageCredits').textContent = stats.gradedCredits;
    $('#averageSimple').textContent = formatAverage(stats.simple);
    $('#statAverage').textContent = average;
    $('#statAverageSub').textContent = stats.gradedCount
      ? stats.gradedCount + ' ' + plural(stats.gradedCount, 'nota', 'notas') + ' · ponderado'
      : 'sin notas';

    let note;
    if (!stats.approvedCount) {
      note = 'Ingresá notas para ver tu promedio.';
    } else if (!stats.gradeableCount) {
      note = 'Solo hay prácticas aprobadas; no afectan el promedio.';
    } else if (!stats.gradedCount) {
      note = 'Ingresá notas para ver tu promedio.';
    } else if (stats.gradedCount < stats.gradeableCount) {
      note = 'Calculado con ' + stats.gradedCount + ' de ' + stats.gradeableCount + ' cursos con nota.';
    } else {
      note = 'Calculado con ' + stats.gradedCount + ' ' + plural(stats.gradedCount, 'curso', 'cursos') +
        ' y ' + stats.gradedCredits + ' créditos.';
    }
    $('#averageNote').textContent = note;
  }

  /* ---------- Render: notas ---------- */
  function renderGrades(stats) {
    const id = state.career;
    const career = CAREERS[id];
    const body = $('#gradesBody');
    const table = $('#gradesTable');
    const empty = $('#gradesEmpty');
    if (!career || !body || !table || !empty) return;

    const approved = stats.approved.slice().sort(function (a, b) {
      return a.semester - b.semester || a.code.localeCompare(b.code);
    });
    const hasRows = approved.length > 0;
    table.hidden = !hasRows;
    empty.hidden = hasRows;

    body.innerHTML = approved.map(function (course) {
      const record = (state.progress[id] && state.progress[id][course.code]) || {};
      const area = course.area ? career.areas[course.area] : null;
      const meta = 'Semestre ' + course.semester + ' · ' + (area ? area.name : 'Área general') +
        ' · ' + course.credits + ' ' + plural(course.credits, 'crédito', 'créditos');
      const gradeCell = course.credits === 0
        ? '<span class="badge badge-neutral">No aplica</span>'
        : '<input type="number" inputmode="decimal" min="0" max="100" step="0.01" data-grade-input data-code="' +
          esc(course.code) + '" value="' + (record.grade != null ? esc(record.grade) : '') +
          '" placeholder="—" aria-label="Nota de ' + esc(course.name) + '">';
      return '<tr>' +
        '<td><span class="course-code">' + esc(course.code) + '</span></td>' +
        '<td><span class="grade-course-name">' + esc(course.name) + '</span>' +
          '<span class="grade-course-meta">' + esc(meta) + '</span></td>' +
        '<td class="num">' + course.credits + '</td>' +
        '<td>' + gradeCell + '</td>' +
        '<td><span class="badge badge-approved">' + svg('check') + ' Aprobado</span></td>' +
      '</tr>';
    }).join('');
  }

  /* ---------- Render: filtros y portada ---------- */
  function updateFilters(stats) {
    const counts = {
      all: ALL_COURSES[state.career].length,
      approved: stats.approvedCount,
      available: stats.availableCount,
      locked: stats.lockedCount,
      failed: stats.failedCount
    };

    $$('#filters [data-filter]').forEach(function (button) {
      const active = button.dataset.filter === state.filter;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    $$('[data-count]').forEach(function (element) {
      element.textContent = counts[element.dataset.count] != null ? counts[element.dataset.count] : 0;
    });
  }

  function renderLandingProgress() {
    CAREER_IDS.forEach(function (id) {
      const career = CAREERS[id];
      const stats = computeStats(id);
      const label = document.querySelector('[data-career-progress="' + id + '"]');
      const bar = document.querySelector('[data-career-bar="' + id + '"]');
      if (label) {
        label.textContent = Math.round(stats.pct) + '% completado';
        label.title = stats.approvedCount + ' de ' + career.totalCourses + ' cursos · ' +
          stats.credits + ' de ' + stats.target + ' créditos CLAR';
      }
      if (bar) bar.style.width = stats.pct + '%';
    });
  }

  function updateCareerSwitch() {
    $$('[data-switch-career]').forEach(function (button) {
      const active = button.dataset.switchCareer === state.career;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
  }

  function renderDashboard() {
    const id = state.career;
    if (!id || !CAREERS[id]) return;
    const stats = computeStats(id);
    renderCareerHeader(id);
    renderPensum(stats);
    updateSummary(stats);
    renderGrades(stats);
    updateFilters(stats);
    updateAverageCard(stats);
    updateCareerSwitch();
    renderLandingProgress();
  }

  /* ---------- Acciones sobre cursos ---------- */
  function handleAction(action, code) {
    const id = state.career;
    if (!id || !CAREERS[id]) return;
    const course = COURSE_INDEX[id] && COURSE_INDEX[id].get(code);
    if (!course) return;

    const progress = state.progress[id];
    const before = computeStats(id);
    const previous = progress[code];
    const previousGrade = previous && previous.grade;

    if (action === 'approve') {
      progress[code] = { status: 'approved' };
      if (previousGrade != null) progress[code].grade = previousGrade;
    } else if (action === 'fail') {
      progress[code] = { status: 'failed' };
    } else if (action === 'clear') {
      delete progress[code];
    } else {
      return;
    }

    saveState();
    const after = computeStats(id);
    const unlocked = after.available.filter(function (item) {
      return !before.availableSet.has(item.code);
    });
    state.pendingUnlock = new Set(unlocked.map(function (item) { return item.code; }));
    const unlockedCount = unlocked.length;

    renderDashboard();

    if (action === 'approve') {
      if (after.credits >= after.target && before.credits < after.target) {
        showToast('¡Completaste los ' + after.target + ' créditos CLAR!');
      } else if (unlockedCount) {
        showToast('Aprobaste ' + course.name + '. Se ' + plural(unlockedCount, 'habilitó 1 curso', 'habilitaron ' + unlockedCount + ' cursos') + '.');
      } else {
        showToast('Aprobaste ' + course.name + '.');
      }
    } else if (action === 'fail') {
      showToast('Marcaste ' + course.name + ' como reprobado.', 'warn');
    } else {
      const dependents = ALL_COURSES[id].filter(function (item) {
        return after.approvedSet.has(item.code) && item.prereqs.indexOf(code) !== -1;
      });
      if (dependents.length) {
        showToast('Quitaste ' + course.name + '. Ojo: ' + dependents.length + ' ' +
          plural(dependents.length, 'curso aprobado depende', 'cursos aprobados dependen') + ' de él.', 'warn');
      } else {
        showToast('Quitaste ' + course.name + ' de tu historial.');
      }
    }
  }

  function showLockedToast(code) {
    const id = state.career;
    if (!id) return;
    const course = COURSE_INDEX[id] && COURSE_INDEX[id].get(code);
    if (!course) return;
    const stats = computeStats(id);
    const missing = course.prereqs.filter(function (prereq) {
      return !stats.approvedSet.has(prereq);
    });
    if (!missing.length) return;
    showToast('Faltan ' + plural(missing.length, 'el curso', 'los cursos') + ' ' + missing.join(', ') +
      ' para habilitar ' + course.name + '.', 'warn');
  }

  /* ---------- Notas ---------- */
  function syncGradeInputs(code, value) {
    $$('[data-grade-input]').forEach(function (input) {
      if (input.dataset.code !== code) return;
      if (input === document.activeElement) return;
      input.value = value == null ? '' : String(value);
    });
  }

  function onGradeInput(input) {
    const id = state.career;
    if (!id) return;
    const record = state.progress[id] && state.progress[id][input.dataset.code];
    if (!record || record.status !== 'approved') return;

    const parsed = parseGrade(input.value);
    if (parsed === undefined) {
      input.setAttribute('aria-invalid', 'true');
      return;
    }
    input.removeAttribute('aria-invalid');
    if (parsed == null) delete record.grade;
    else record.grade = parsed;

    saveState();
    syncGradeInputs(input.dataset.code, parsed);
    const stats = computeStats(id);
    updateSummary(stats);
    updateAverageCard(stats);
  }

  function onGradeChange(input) {
    const id = state.career;
    if (!id) return;
    const parsed = parseGrade(input.value);
    if (parsed === undefined) {
      const record = state.progress[id] && state.progress[id][input.dataset.code];
      input.value = record && record.grade != null ? String(record.grade) : '';
      input.removeAttribute('aria-invalid');
      showToast('La nota debe ser un número entre 0 y 100.', 'warn');
    } else if (parsed != null && parsed < 61) {
      showToast('Ojo: ' + parsed + ' no alcanza la nota mínima de aprobación (61).', 'warn');
    }
  }

  function clearGrades() {
    const id = state.career;
    if (!id) return;
    let count = 0;
    Object.keys(state.progress[id] || {}).forEach(function (code) {
      const record = state.progress[id][code];
      if (record && record.status === 'approved' && record.grade != null) {
        delete record.grade;
        count += 1;
      }
    });
    if (!count) {
      showToast('No hay notas para limpiar.', 'warn');
      return;
    }
    saveState();
    renderDashboard();
    showToast('Se limpiaron las notas de ' + count + ' ' + plural(count, 'curso', 'cursos') + '.');
  }

  /* ---------- Búsqueda y filtros ---------- */
  function clearSearch() {
    const input = $('#searchInput');
    state.query = '';
    if (input) input.value = '';
    const clear = $('#searchClear');
    if (clear) clear.hidden = true;
    if (state.career) renderPensum(computeStats(state.career));
  }

  function onSearchInput() {
    const input = $('#searchInput');
    if (!input || !state.career) return;
    state.query = input.value;
    const clear = $('#searchClear');
    if (clear) clear.hidden = !state.query;
    renderPensum(computeStats(state.career));
  }

  function onFilterClick(event) {
    const target = event.target instanceof Element ? event.target.closest('[data-filter]') : null;
    if (!target || !state.career) return;
    state.filter = target.dataset.filter;
    const stats = computeStats(state.career);
    updateFilters(stats);
    renderPensum(stats);
  }

  /* ---------- Exportar / importar ---------- */
  function exportProgress() {
    if (!state.career) return;
    const payload = {
      app: 'control-cursos-fiusac',
      version: 1,
      exportedAt: new Date().toISOString(),
      career: state.career,
      progress: state.progress
    };
    let total = 0;
    Object.keys(state.progress).forEach(function (id) {
      total += Object.keys(state.progress[id]).length;
    });

    try {
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'control-cursos-fiusac-' + todayStamp() + '.json';
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
      showToast('Progreso exportado: ' + total + ' ' + plural(total, 'curso', 'cursos') + '.');
    } catch (error) {
      showToast('No pudimos generar el archivo de respaldo.', 'error');
    }
  }

  async function handleImportFile(file) {
    if (!file) return;
    const input = $('#importInput');
    try {
      if (file.size > 4 * 1024 * 1024) throw new Error('Archivo demasiado grande');
      const text = await file.text();
      const payload = JSON.parse(text);
      const source = payload && payload.progress ? payload.progress : payload;
      const clean = sanitizeProgress(source);
      if (!clean || !clean.count) {
        showToast('El archivo no contiene un progreso válido.', 'error');
        return;
      }
      CAREER_IDS.forEach(function (id) {
        Object.assign(state.progress[id], clean.progress[id]);
      });
      if (payload && CAREER_IDS.indexOf(payload.career) !== -1) state.lastCareer = payload.career;
      saveState();
      if (state.career) renderDashboard();
      else renderLandingProgress();
      showToast('Progreso importado: ' + clean.count + ' ' + plural(clean.count, 'curso', 'cursos') + '.');
    } catch (error) {
      showToast('No pudimos leer el archivo. Verificá que sea un respaldo JSON de esta página.', 'error');
    } finally {
      if (input) input.value = '';
    }
  }

  /* ---------- Copiar resumen ---------- */
  async function copyText(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (error) {
      /* Usamos el respaldo de abajo. */
    }
    try {
      const area = document.createElement('textarea');
      area.value = text;
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      const ok = document.execCommand('copy');
      area.remove();
      return ok;
    } catch (error) {
      return false;
    }
  }

  async function copySummary() {
    const id = state.career;
    if (!id) return;
    const career = CAREERS[id];
    const stats = computeStats(id);
    const lines = [
      'Control de Cursos Aprobados · FIUSAC',
      career.name + ' · Pensum ' + career.pensum,
      '',
      'Créditos obtenidos: ' + stats.credits + ' de ' + stats.target + ' CLAR',
      'Créditos restantes: ' + stats.remaining,
      'Cursos aprobados: ' + stats.approvedCount + ' de ' + career.totalCourses,
      'Promedio ponderado: ' + formatAverage(stats.weighted),
      'Prácticas: ' + stats.practicesDone + ' de ' + stats.practicesTotal + ' aprobadas',
      '',
      'Generado el ' + formatDateLong(new Date())
    ];
    const ok = await copyText(lines.join('\n'));
    if (ok) showToast('Resumen copiado al portapapeles.');
    else showToast('No pudimos copiar el resumen. Seleccionalo manualmente.', 'error');
  }

  /* ---------- Impresión ---------- */
  function setPrintHeader() {
    if (!state.career) return;
    const career = CAREERS[state.career];
    $('#printCareer').textContent = career.name + ' · Pensum ' + career.pensum;
    $('#printDate').textContent = 'Generado el ' + formatDateLong(new Date());
  }

  function handlePrint() {
    if (!state.career) return;
    setPrintHeader();
    window.print();
  }

  function onBeforePrint() {
    if (!state.career) return;
    printPrev = {
      filter: state.filter,
      query: state.query,
      input: $('#searchInput').value
    };
    state.filter = 'all';
    state.query = '';
    $('#searchInput').value = '';
    $('#searchClear').hidden = true;
    const stats = computeStats(state.career);
    renderPensum(stats);
    updateFilters(stats);
    setPrintHeader();
  }

  function onAfterPrint() {
    if (!printPrev) return;
    state.filter = printPrev.filter;
    state.query = printPrev.query;
    $('#searchInput').value = printPrev.input;
    $('#searchClear').hidden = !printPrev.input;
    printPrev = null;
    if (state.career) {
      const stats = computeStats(state.career);
      renderPensum(stats);
      updateFilters(stats);
    }
  }

  /* ---------- Rutas ---------- */
  function careerFromHash() {
    try {
      const raw = decodeURIComponent(location.hash.replace(/^#\/?/, '')).trim().toLowerCase();
      return CAREER_IDS.indexOf(raw) !== -1 ? raw : null;
    } catch (error) {
      return null;
    }
  }

  function showCareer(id) {
    const career = CAREERS[id];
    if (!career) {
      showLanding();
      return;
    }
    const changed = state.career !== id;
    state.career = id;
    state.lastCareer = id;

    if (changed) {
      state.filter = 'all';
      state.query = '';
      $('#searchInput').value = '';
      $('#searchClear').hidden = true;
    }

    document.body.dataset.career = id;
    $('#landing').hidden = true;
    $('#dashboard').hidden = false;
    document.title = career.shortName + ' · Control de Cursos Aprobados';
    setPrintHeader();
    renderDashboard();

    if (changed) {
      saveState({ silent: true });
      window.scrollTo(0, 0);
    }
  }

  function showLanding() {
    state.career = null;
    delete document.body.dataset.career;
    $('#dashboard').hidden = true;
    $('#landing').hidden = false;
    document.title = 'Control de Cursos Aprobados · FIUSAC';
    renderLandingProgress();
    window.scrollTo(0, 0);
  }

  function applyRoute() {
    const id = careerFromHash();
    if (id) showCareer(id);
    else showLanding();
  }

  function initRoute() {
    let initial = careerFromHash();
    if (!initial && !location.hash && state.lastCareer) {
      initial = state.lastCareer;
      try {
        history.replaceState(null, '', '#' + state.lastCareer);
      } catch (error) {
        /* Si el navegador lo bloquea, abrimos igual la última carrera. */
      }
    }
    if (initial) showCareer(initial);
    else showLanding();
  }

  /* ---------- Eventos ---------- */
  function onPensumClick(event) {
    if (!(event.target instanceof Element)) return;
    const action = event.target.closest('[data-action]');
    if (action && $('#pensumGrid').contains(action)) {
      handleAction(action.dataset.action, action.dataset.code);
      return;
    }
    if (event.target.closest('input, label, button, a')) return;
    const card = event.target.closest('.course-card');
    if (!card) return;
    if (card.dataset.status === 'available' || card.dataset.status === 'failed') {
      handleAction('approve', card.dataset.code);
    } else if (card.dataset.status === 'locked') {
      showLockedToast(card.dataset.code);
    }
  }

  function onDocumentInput(event) {
    if (!(event.target instanceof Element)) return;
    const input = event.target.closest('[data-grade-input]');
    if (input) onGradeInput(input);
  }

  function onDocumentChange(event) {
    if (!(event.target instanceof Element)) return;
    const input = event.target.closest('[data-grade-input]');
    if (input) onGradeChange(input);
  }

  function onKeydown(event) {
    const modal = $('#modal');
    if (modal && !modal.hidden) {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeModal();
        return;
      }
      if (event.key === 'Tab') {
        const focusables = $$('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])', modal)
          .filter(function (element) { return !element.disabled && element.offsetParent !== null; });
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
      return;
    }
    if (event.key === 'Escape' && document.activeElement === $('#searchInput') && state.query) {
      clearSearch();
    }
  }

  function bindEvents() {
    $$('a.brand').forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        if (location.hash === '#landing') showLanding();
        else location.hash = '#landing';
      });
    });

    $$('[data-switch-career]').forEach(function (button) {
      button.addEventListener('click', function () {
        const id = button.dataset.switchCareer;
        if (state.career === id) return;
        location.hash = '#' + id;
      });
    });

    $('#resetBtn').addEventListener('click', openModal);
    $('#modalCancel').addEventListener('click', closeModal);
    $('#modalConfirm').addEventListener('click', confirmReset);
    $('#modal').addEventListener('click', function (event) {
      if (event.target === event.currentTarget) closeModal();
    });

    $('#exportBtn').addEventListener('click', exportProgress);
    $('#importBtn').addEventListener('click', function () { $('#importInput').click(); });
    $('#importInput').addEventListener('change', function (event) {
      handleImportFile(event.target.files && event.target.files[0]);
    });
    $('#printBtn').addEventListener('click', handlePrint);
    $('#clearGradesBtn').addEventListener('click', clearGrades);
    $('#shareBtn').addEventListener('click', copySummary);

    $('#searchInput').addEventListener('input', onSearchInput);
    $('#searchClear').addEventListener('click', clearSearch);
    $('#filters').addEventListener('click', onFilterClick);
    $('#pensumGrid').addEventListener('click', onPensumClick);

    document.addEventListener('input', onDocumentInput);
    document.addEventListener('change', onDocumentChange);
    document.addEventListener('keydown', onKeydown);
    window.addEventListener('hashchange', applyRoute);
    window.addEventListener('beforeprint', onBeforePrint);
    window.addEventListener('afterprint', onAfterPrint);
  }

  /* ---------- Arranque ---------- */
  function injectIcons() {
    $$('[data-icon]').forEach(function (element) {
      const name = element.getAttribute('data-icon');
      if (ICONS[name]) element.innerHTML = svg(name);
    });
    ['brandMarkLanding', 'brandMarkTop'].forEach(function (id) {
      const mark = document.getElementById(id);
      if (mark) mark.innerHTML = svg('graduation');
    });
  }

  function init() {
    if (!hasData || !CAREER_IDS.length) {
      console.error('No se pudieron cargar las redes de estudio.');
      return;
    }
    buildIndex();
    loadState();
    injectIcons();
    bindEvents();
    renderLandingProgress();
    initRoute();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
