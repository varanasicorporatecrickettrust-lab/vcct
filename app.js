const appState = { data: null, modal: document.getElementById('team-modal') };

const pageRenderers = {
  index: renderHome,
  about: renderAbout,
  organization: renderOrganization,
  tournaments: renderTournaments,
  teams: renderTeams,
  players: renderPlayers,
  gallery: renderGallery,
  rules: renderRules,
  join: renderJoin
};

async function init() {
  appState.nav = await fetchJson('./data.json');
  const page = document.body.dataset.page || 'index';
  if (page === 'tournaments') {
    appState.data = { tournaments: await fetchJson('./tournaments.json') };
  } else if (page === 'teams') {
    appState.data = { teams: await fetchJson('./teams.json') };
  } else if (page === 'players') {
    appState.data = { players: await fetchJson('./players.json') };
  } else {
    appState.data = {};
  }
  renderNav(page);
  initNavToggle();
  pageRenderers[page]?.();
}

async function fetchJson(path) {
  const response = await fetch(path);
  return response.ok ? response.json() : [];
}

function renderNav() {
  let currentFile = window.location.pathname.split('/').pop();
  if (!currentFile || currentFile === '/') currentFile = 'index.html';
  const nav = document.getElementById('site-nav');
  if (!nav || !appState.nav?.navigation) return;
  nav.innerHTML = appState.nav.navigation.map(item => {
    const active = item.href === currentFile ? ' active' : '';
    return `<a href="${item.href}" class="nav-link${active}">${item.label}</a>`;
  }).join('');
}

function renderHome() {
  const root = document.getElementById('page-content');
  root.innerHTML = `
    <section class="hero" id="home">
      <div class="hero-copy">
        <p class="eyebrow">Official Tournament Platform</p>
        <h2>One Identity. One Team. Fair Competition.</h2>
        <p>VCCT is dedicated to promoting a professional, transparent, and inclusive corporate cricket culture in Varanasi. The trust organizes tournaments that foster networking, fitness, and sportsmanship among working professionals through identity-based corporate cricket.</p>
        <div class="hero-actions">
          <a class="btn" href="tournaments.html">Explore Tournaments</a>
          <a class="btn btn-secondary" href="teams.html">Meet Teams</a>
        </div>
        <div class="hero-stats"><span class="stat-pill">10+ Teams</span><span class="stat-pill">5+ Seasons</span><span class="stat-pill">100% Transparency</span><span class="stat-pill">Community-first Values</span></div>
      </div>
      <div class="hero-card">
        <h3>Why VCCT</h3>
        <ul>
          <li>Professional and transparent tournaments</li>
          <li>Inclusive participation for working professionals</li>
          <li>Strong values around fair play and identity</li>
        </ul>
      </div>
    </section>
    <section class="section" id="about">
      <div class="section-header">
        <p class="eyebrow">About VCCT</p>
        <h2>Building trust through cricket</h2>
      </div>
      <div class="about-grid">
        ${simpleCard('Our Story', 'Origins and purpose', 'VCCT was created to bring working professionals in Varanasi together through sport, mentorship, and healthy competition. The trust believes that cricket should be played with identity, dignity, and fairness.')}
        ${simpleCard('Why VCCT', 'Transparency & identity', 'Every tournament is designed to balance competitiveness with transparency. Teams represent real identities, players are verified, and the spirit of the game remains central.')}
        ${simpleCard('Mission', 'Our approach', 'To promote corporate cricket as a powerful tool for team bonding, professional networking, fitness, and community pride in Varanasi.')}
        ${simpleCard('Vision', 'Our future', 'To become the most trusted platform for identity-based corporate cricket in Eastern Uttar Pradesh and beyond.')}
      </div>
    </section>
  `;
}

function renderAbout() {
  document.getElementById('page-content').innerHTML = `
    <section class="section">
      <div class="section-header">
        <p class="eyebrow">About VCCT</p>
        <h2>Our story, mission and values</h2>
      </div>
      <div class="about-grid">
        <div class="card"><span class="tag">Our Story</span><h3>Origins and purpose</h3><p>VCCT was created to bring working professionals in Varanasi together through sport, mentorship, and healthy competition. The trust believes that cricket should be played with identity, dignity, and fairness.</p></div>
        <div class="card"><span class="tag">Why VCCT</span><h3>Transparency & identity</h3><p>Every tournament is designed to balance competitiveness with transparency. Teams represent real identities, players are verified, and the spirit of the game remains central.</p></div>
        <div class="card"><span class="tag">Mission</span><h3>Our approach</h3><p>To promote corporate cricket as a powerful tool for team bonding, professional networking, fitness, and community pride in Varanasi.</p></div>
        <div class="card"><span class="tag">Vision</span><h3>Our future</h3><p>To become the most trusted platform for identity-based corporate cricket in Eastern Uttar Pradesh and beyond.</p></div>
        <div class="card"><span class="tag">Core Values</span><h3>What we stand for</h3><p>Fair Competition, One Identity, Transparency, Respect, Sportsmanship, and Team Bonding.</p></div>
      </div>
    </section>
  `;
}

function renderOrganization() {
  document.getElementById('page-content').innerHTML = `
    <section class="section">
      <div class="section-header">
        <p class="eyebrow">Organization</p>
        <h2>Leadership and trust structure</h2>
      </div>
      <div class="card-grid">
        <div class="card"><span class="tag">Founder</span><h3>Vision & Legacy</h3><p>The founding architect behind VCCT's identity-based tournament model.</p></div>
        <div class="card"><span class="tag">President</span><h3>Leadership</h3><p>Guides policy, partnerships, and the strategic growth of the trust.</p></div>
        <div class="card"><span class="tag">Vice President</span><h3>Operations</h3><p>Oversees event delivery, stakeholder coordination, and member engagement.</p></div>
        <div class="card"><span class="tag">Secretary</span><h3>Administration</h3><p>Manages communications, registrations, and day-to-day records.</p></div>
        <div class="card"><span class="tag">Joint Secretary</span><h3>Support</h3><p>Supports administrative execution and volunteer coordination.</p></div>
        <div class="card"><span class="tag">Treasurer</span><h3>Finance</h3><p>Handles budgets, sponsorships, and transparent financial planning.</p></div>
        <div class="card"><span class="tag">Tournament Director</span><h3>Competitions</h3><p>Shapes rules, schedules, and tournament operations.</p></div>
        <div class="card"><span class="tag">Media Head</span><h3>Public Relations</h3><p>Leads promotion, content, and community storytelling.</p></div>
        <div class="card"><span class="tag">Technical Head</span><h3>Systems</h3><p>Ensures scoring, logistics, and digital support remain smooth.</p></div>
        <div class="card"><span class="tag">Umpire Panel</span><h3>Match Officials</h3><p>Ensures fair play and rule adherence on the field.</p></div>
        <div class="card"><span class="tag">Volunteers</span><h3>Event Support</h3><p>Power the event logistics, hospitality, and community engagement.</p></div>
      </div>
    </section>
  `;
}

function renderTournaments() {
  document.getElementById('page-content').innerHTML = `
    <section class="section">
      <div class="section-header">
        <p class="eyebrow">Tournaments</p>
        <h2>Structured competition with clear rules</h2>
      </div>
      <div class="card-grid">${appState.data.tournaments.map(item => tournamentCard(item)).join('')}</div>
    </section>
  `;
}

function renderTeams() {
  document.getElementById('page-content').innerHTML = `
    <section class="section">
      <div class="section-header">
        <p class="eyebrow">Teams</p>
        <h2>Registered company teams</h2>
      </div>
      <div class="card-grid">${appState.data.teams.map(team => teamCard(team)).join('')}</div>
    </section>
  `;
  document.querySelectorAll('[data-team-id]').forEach(btn => btn.addEventListener('click', openTeamModal));
}

function renderPlayers() {
  document.getElementById('page-content').innerHTML = `
    <section class="section">
      <div class="section-header">
        <p class="eyebrow">Players</p>
        <h2>Profiled athletes from your corporate teams</h2>
      </div>
      <div class="card-grid">${appState.data.players.map(player => simpleCard(player.name, player.company, `<ul><li><strong>Role:</strong> ${player.role}</li><li><strong>Batting:</strong> ${player.batting}</li><li><strong>Bowling:</strong> ${player.bowling}</li></ul>`)).join('')}</div>
    </section>
  `;
}

function renderGallery() {
  document.getElementById('page-content').innerHTML = `
    <section class="section">
      <div class="section-header">
        <p class="eyebrow">Gallery</p>
        <h2>Match photography and event highlights</h2>
      </div>
      <div class="card-grid">
        <div class="card"><h3>Photos</h3><p><strong>Opening Ceremony</strong><br>A warm welcome to all participating teams.</p><p><strong>On-Field Action</strong><br>Fast-paced competition and sharp fielding.</p><p><strong>Awards Night</strong><br>Celebrating sportsmanship and fair play.</p></div>
        <div class="card"><h3>Videos</h3><p><strong>Match Highlights</strong><br>Short highlights from the latest league fixture.</p><p><strong>Community Message</strong><br>VCCT's leaders on the future of corporate cricket.</p></div>
      </div>
    </section>
  `;
}

function renderRules() {
  document.getElementById('page-content').innerHTML = `
    <section class="section">
      <div class="section-header">
        <p class="eyebrow">Rules</p>
        <h2>Official tournament policy and eligibility</h2>
      </div>
      <div class="rules-list">
        <div class="rules-item"><h3>Objective</h3><p>VCCT promotes fair, identity-based corporate cricket where every team represents one organization, one profession, one institution, or one registered group.</p></div>
        <div class="rules-item"><h3>Team Eligibility</h3><p>A team may register only if all players belong to the same entity such as a company, bank, government department, hospital, educational institution, startup, factory, club, NGO, or professional association.</p></div>
        <div class="rules-item"><h3>Player Eligibility</h3><p>Every player must genuinely belong to the team they represent. Proof may include employee ID, appointment letter, salary slip, official email ID, or membership certificate.</p></div>
        <div class="rules-item"><h3>Player Verification</h3><p>VCCT reserves the right to verify any player before, during, or after the tournament. Failure to provide valid proof may result in disqualification.</p></div>
        <div class="rules-item"><h3>Fair Play & Spirit</h3><p>Respect, transparency, sportsmanship, and identity-based competition remain central to all VCCT events.</p></div>
        <div class="rules-item"><h3>Umpire Rules</h3><p>The umpire panel has final authority on the field. Teams must cooperate with officials and respect their decisions.</p></div>
        <div class="rules-item"><h3>Dispute Resolution</h3><p>Protests must be submitted in writing with evidence. The Tournament Committee's decision is final and binding.</p></div>
        <div class="rules-item"><h3>Rain Rules</h3><p>Matches affected by weather will follow standard revisions and revised targets as per the tournament format.</p></div>
        <div class="rules-item"><h3>Player Transfer Rules</h3><p>Transfers or replacements are allowed only when the new player satisfies the original eligibility criteria of the team.</p></div>
      </div>
    </section>
  `;
}

function renderJoin() {
  document.getElementById('page-content').innerHTML = `
    <section class="section">
      <div class="section-header">
        <p class="eyebrow">Join Us</p>
        <h2>Register your team or player</h2>
      </div>
      <div class="join-card">
        <h3>Join VCCT</h3>
        <p>Register a team or express interest to participate in the next corporate cricket tournament. We welcome organizations, departments, institutions, clubs, and professional groups.</p>
        <p><strong>Email: info@vcct.in | Phone: +91-XXXXXXXXXX</strong></p>
        <a class="btn" href="mailto:info@vcct.in">Contact VCCT</a>
      </div>
    </section>
  `;
}

function simpleCard(title, subtitle, body = '') {
  return `
    <div class="card">
      <span class="tag">${subtitle}</span>
      <h3>${title}</h3>
      <div>${body}</div>
    </div>
  `;
}

function tournamentCard(item) {
  return `
    <div class="card">
      <span class="tag">${item.tag}</span>
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <ul>
        <li><strong>Schedule:</strong> ${item.schedule}</li>
        <li><strong>Format:</strong> ${item.points}</li>
        <li><strong>Awards:</strong> ${item.awards}</li>
      </ul>
    </div>
  `;
}

function teamCard(team) {
  return `
    <div class="card">
      <span class="tag">${team.company}</span>
      <h3>${team.name}</h3>
      <p>${team.description}</p>
      <ul>
        <li><strong>Captain:</strong> ${team.captain}</li>
        <li><strong>Vice Captain:</strong> ${team.viceCaptain}</li>
        <li><strong>Jersey:</strong> ${team.jersey}</li>
        <li>${team.stats}</li>
      </ul>
      <button class="btn" data-team-id="${team.id}">View Team</button>
    </div>
  `;
}

function openTeamModal(event) {
  const teamId = event.currentTarget.getAttribute('data-team-id');
  const team = appState.data.teams.find(item => item.id === teamId);
  if (!team) return;

  appState.modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-top">
        <div>
          <p class="eyebrow">Team Profile</p>
          <h3>${team.name}</h3>
        </div>
        <button class="close-btn" aria-label="Close">×</button>
      </div>
      <div class="badges">
        <span>${team.company}</span>
        <span>${team.jersey}</span>
      </div>
      <p>${team.description}</p>
      <ul>
        <li><strong>Captain:</strong> ${team.captain}</li>
        <li><strong>Vice Captain:</strong> ${team.viceCaptain}</li>
        <li><strong>Statistics:</strong> ${team.stats}</li>
      </ul>
      <h4>Players</h4>
      <ul>${team.players.map(player => `<li><strong>${player.name}</strong> • ${player.role} • Batting: ${player.batting} • Bowling: ${player.bowling}</li>`).join('')}</ul>
      <h4>Previous Seasons</h4>
      <ul>${team.previousSeasons.map(item => `<li>${item}</li>`).join('')}</ul>
    </div>
  `;
  appState.modal.hidden = false;
  appState.modal.querySelector('.close-btn').addEventListener('click', closeTeamModal);
  appState.modal.addEventListener('click', (event) => {
    if (event.target === appState.modal) closeTeamModal();
  });
}

function closeTeamModal() {
  appState.modal.hidden = true;
  appState.modal.innerHTML = '';
}

function initNavToggle() {
  const toggle = document.getElementById('nav-toggle');
  const body = document.body;
  if (!toggle) return;
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    body.classList.toggle('nav-open');
  });
}

init();
