/* data.js: THE CONTENT FILE. Lists the scripts build from: ticker words, skill graph scores,
   stack tools, "where I used it" notes, and the order of the views.
   Edit here and you shouldn't need to touch any other JS. Docs: Doc/Elements/Site Data.md */
window.Site = window.Site || {};
window.Site.data = {

  /* Ticker strip across the top of home. [label, 1] = testing item, shown green. */
  ticker: [['Manual testing',1],['Exploratory testing',1],['Given/When/Then',1],['Regression',1],['xUnit',1],['Postman',1],['Playwright',1],['Cypress',1],['DevTools',1],
    ['C#'],['TypeScript'],['JavaScript'],['Java'],['Kotlin'],['PHP'],['Python'],['ASP.NET Core'],['.NET'],['React'],['Next.js'],['Tailwind CSS'],['Flask'],
    ['Azure App Service'],['Azure Functions'],['Azure Pipelines'],['Azure Repos'],['Azure Artifacts'],['PostgreSQL'],['Supabase'],['Drizzle ORM'],['SQLite'],['MySQL'],['PayFast'],
    ['Git'],['GitHub'],['Visual Studio'],['VS Code'],['Claude Code'],['Cursor']],

  /* Skill graph (radar) on home. k = axis name, v = score out of 100, d = tools shown when hovered.
     Edit the numbers to match how you rate yourself. */
  skills: [
    {k:'Web',v:90,d:'React, Next.js, TypeScript, Tailwind'},
    {k:'.NET',v:80,d:'C#, ASP.NET Core, Azure Functions'},
    {k:'Testing',v:82,d:'Manual, exploratory, xUnit, Postman, Playwright, Cypress'},
    {k:'Teaching',v:85,d:'Java, OOP, pass rate 65% to 85%'},
    {k:'Data',v:70,d:'PostgreSQL, Supabase, SQLite, MySQL'},
    {k:'Cloud & CI',v:65,d:'Azure Pipelines, App Service, Git'},
    {k:'Mobile',v:55,d:'Kotlin, MVVM, Room'}
  ],

  /* Stack view: filter buttons. k = group key used in stackTools below, n = button label. */
  stackGroups: [{k:'all',n:'All'},{k:'test',n:'Testing'},{k:'code',n:'Code'},{k:'fw',n:'Frameworks'},{k:'cloud',n:'Cloud and data'},{k:'flow',n:'Workflow'}],

  /* Stack view: chips. [group key, tool name]. 'test' chips are coloured copper. */
  stackTools: [
    ['test','Manual testing'],['test','Exploratory testing'],['test','Test case design'],['test','Given/When/Then'],['test','Acceptance criteria'],['test','Regression testing'],['test','Defect logging'],['test','xUnit'],['test','Postman'],['test','Playwright'],['test','Cypress'],['test','Browser DevTools'],
    ['code','C#'],['code','TypeScript'],['code','JavaScript'],['code','Java'],['code','Kotlin'],['code','PHP'],
    ['fw','ASP.NET Core'],['fw','.NET'],['fw','React'],['fw','Next.js'],['fw','Tailwind CSS'],
    ['cloud','Azure App Service'],['cloud','Azure Functions'],['cloud','PostgreSQL'],['cloud','Supabase'],['cloud','SQLite'],['cloud','MySQL'],['cloud','Azure Pipelines'],['cloud','Azure Repos'],['cloud','Azure Artifacts'],
    ['flow','Git'],['flow','GitHub'],['flow','Pull requests'],['flow','Code review'],['flow','Visual Studio'],['flow','VS Code'],['flow','Claude Code'],['flow','Cursor']
  ],

  /* Stack view: "where I used it" text when a chip is tapped. Name must match the chip exactly.
     Tools not listed show "Part of my everyday toolkit". */
  stackUsed: {
    'xUnit':'Thuso: 27 unit tests on a shared library','Postman':'Thuso: 8 API tests, 20 assertions, local and live Azure',
    'Given/When/Then':'Sok: 53 test scenarios','Defect logging':'Sok: 8 defects logged with root causes',
    'Exploratory testing':'Sok: caught an animation playing twice','Azure Pipelines':'Thuso: builds and tests every push',
    'Azure Functions':'Thuso: validation API (400 and 422)','Pull requests':'Thuso: feature branches, PRs, one merge conflict resolved',
    'Azure Artifacts':'Thuso: library published as a NuGet package','C#':'Thuso and Monthly Claims System',
    'ASP.NET Core':'Thuso and Monthly Claims System','TypeScript':'Sok and Fen & Fern','React':'Fen & Fern','Next.js':'Sok',
    'Supabase':'Sok','Java':'Tutoring first-year students','Kotlin':'Snokonoko, Android finance tracker','Test case design':'Sok and Thuso',
    'Git':'Every project','GitHub':'Every project'
  },

  /* Views: prev/next order and browser tab titles. Each id needs a <section id="v-ID"> in index.html
     and a tile with data-go="ID". */
  viewOrder: ['about','stack','freelance','projects','tutoring','education','languages','contact'],
  viewNames: {about:'About',stack:'Stack',freelance:'Freelance',projects:'Projects',tutoring:'Tutoring',education:'Education',languages:'Languages',contact:'Contact'}
};
