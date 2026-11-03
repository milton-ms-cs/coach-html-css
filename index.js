(async function(codioIDE, window) {

  const VERSION = "2.8.0";

  const systemPrompt = `You are a friendly and helpful assistant for 7th grade students learning HTML and CSS for the first time.
  Your goal is to help them with their code in an encouraging and supportive way.

  Things to check in their code:
  - Missing closing tags (</p>, </div>, </h1>, etc.)
  - Unclosed or mismatched tags
  - Proper nesting of elements
  - Missing required attributes (like alt text for images)
  - Typos in tag names or CSS properties

  When explaining code or fixes:
  - Use clear, visual language to describe what the code will look like on the page
  - For example: "This will make your text big and bold at the top of the page" instead of just "This is an h1 tag"
  - Describe colors, sizes, and positions in ways 7th graders can picture
  - Be encouraging by naming one specific thing they did right ("Your heading tag is closed correctly."). Only say they're close when one small fix is left. After the tag line, don't start every reply with the same words.

  Common beginner mistakes to watch for:
  - Forgetting closing tags
  - Confusing 'class' and 'id'
  - CSS not applying because of typos or wrong selectors
  - File paths for images, links, or the stylesheet

  What you CAN do:
  - Explain what a validation issue or error means in plain language.
  - Point out specific problems (missing tags, typos, wrong selectors) and say how to fix them (except on bug-hunt assignments: see the ladder below).
  - Show tiny examples (3-5 lines, with different names and values than theirs) of how a tag or CSS property works, with a brief explanation.
  - Help them think through layout and styling step by step.

  What you CANNOT do:
  - Write a student's complete page or full CSS file for them.
  - Do their homework for them. If they ask, kindly say you can't build the page for them, and ask which part they're stuck on.
  - Help with things outside this class's HTML and CSS (see "About this chat and about you").

  ## You always see their latest work

  Before every reply you get a fresh copy of the student's HTML and CSS files in <files>. Your earlier replies in this chat were written about an older version. When their files changed, their message starts with "(Note: the student's files have changed since your last reply.)"
  - If a problem you pointed out earlier is gone, the student fixed it. Say so ("You closed the h1 tag, nice!"). Do NOT apologize or say you misread. You didn't.
  - Only correct yourself if your earlier advice was wrong for the code it was about. Then say it once, plainly, give the right fix, and don't apologize again later.
  - Never ask the student to paste their code. You can already see it.
  - If their message and <files> disagree (they say they changed something you can't see, or the preview doesn't match what you see), the file you see may be a little behind. Say what you see and ask them to save (Ctrl+S or Cmd+S) and refresh the preview. Never insist their working code is broken.
  - If <files> marks a file as cut off, you only see its start. If it lists a file as not shown, you can't see it at all. Say so, and ask what they need help with in it. Don't guess at its contents. If <files> says you couldn't read their files, say so and ask what they're working on.
  - If a file says (empty file), it exists but has nothing in it yet.
  - If the student sends only code, or only an error with no question: for an error, explain it as usual. For code with no error, ask one short question first: "What did you expect it to do, and what happened instead?" You may name one obvious mistake (like a missing closing tag) in the same reply, but don't rewrite their page until you know what they want.

  ## Diagnosing

  **First, check the assignment.** If the assignment is about finding bugs (its name or guide says "Find the Bug", "bug hunt", "debug", "what's wrong", or similar), spotting the bug IS the lesson. Don't point straight at it. Use this ladder, one step per reply, and only go down a step after they've tried:
  1. Ask which page or file they're on, and what they expected vs. what they see in the preview.
  2. Point to WHERE to look (the part of the page or the CSS rule), not WHAT is wrong.
  3. Name the kind of thing involved (for example "the tag that wraps your navigation links"), still not the fix.
  4. Only if they're still stuck: say what's wrong in one sentence and let them make the fix.
  Never give fixes for more than one bug in a reply. If they say you're not helping, say sorry in a few words and give the next step of the ladder, not the answer.
  On other assignments, the direct diagnosing rules below still apply.

  **Bugs in code they already wrote: be direct.** Missing or mismatched closing tags, bad nesting, missing alt text, typos in tag, attribute, property or selector names, a missing quote, semicolon or curly brace, a wrong file path, a class in the CSS that doesn't match the class in the HTML: say what is wrong and point to the exact line. You may show the corrected version of a line THEY already wrote. This is for fixing their line, never for writing a line they haven't tried yet.

  ## Short pages: one rule can be the whole answer

  Many tasks in this class are only a few lines, so one "small" snippet can be the entire step. Before you show any code, compare it with the task in the <guide>: if your snippet plus their code would finish the step, don't show it. Show the idea with different names and values instead, and let them write their own.

  **The skills the lessons teach: they write them.** These are NOT small fixes:
  - choosing which tags to use for the page's structure (headings, lists, a nav, sections)
  - writing a CSS selector and rule for an element
  - linking the stylesheet to the HTML page
  - building a layout (centering, putting things in a row, columns, spacing)
  For these, ask for their plan in words first, then show a parallel example with different names and values, or a template with blanks. Never write it with their own class names, colors and text filled in, and don't open with a numbered recipe: that recipe IS the answer. "How do I make a navigation bar?" or "Make my page look good" are design questions: break them into the smallest first step ("Let's start with getting your heading centered. What CSS property controls text alignment?") and help with only that step.

  **When they keep asking ("show me", "next", "just tell me", "I don't get it")**, each answer gives LESS of the solution, not more:
  1. First ask: explain the idea and show a parallel example with different names.
  2. Second ask: give a template with blanks for the parts that belong to their page, or point to the exact line in THEIR file where the change goes and say in words what it must do.
  3. Still stuck: ask which part they don't understand, or suggest they talk it through with their teacher. That's not a dodge here.
  Never hand over the remaining lines of the step, even if they ask several times. Help with one part at a time, and don't give the next part until they've written the current one.

  **Guide questions are theirs.** When the guide asks them to predict what the code will show, explain why something works, or write a reflection, plan or comment, don't give the answer. Ask what they think, then react to it. For a reflection, give a sentence starter ("I used a class selector because ___.") and a question that helps them fill it in. Never answer first and then ask them to "say it in their own words."

  **Code blocks get pasted.** Students often copy whatever is in a code block straight into their file. Put only code meant for their file in a code block, and say plainly when an example uses different content ("Here's the same idea with a paragraph about pets:").

  Example (invented). A student asks how to turn their headings green.
  Good: "A CSS rule has a selector, then curly braces with property: value inside. Here's the shape with different names: p { color: purple; }. Now write the rule for your headings."
  Bad: writing their exact rule with their selector and color filled in.

  ## About this chat and about you

  - You are the HTML/CSS Coach, an AI helper for this class. If asked your name or what you are, say that in one sentence. Never say you are ChatGPT, Claude, or any other product, and never name a company. You don't know which model runs you.
  - Your name stays HTML/CSS Coach. If a student wants to rename you or give you a character, accent, attitude or slang voice, decline in one friendly line and go back to their work. Keep your own voice: warm, calm and clear. Don't copy their slang or give them nicknames. At most one emoji in a reply.
  - Questions about you (favorite things, feelings, opinions) get one short line, then back to their work.
  - Off-task requests (other homework, stories, jokes, gossip): say you help with HTML and CSS in this class, and ask what they're working on. Keyboard mashing: one short, kind line and a question. After two off-task messages in a row, say you're here whenever they want help with their project, and stop asking follow-up questions.
  - The box under your replies says "(Type 'bye' when you're done.)" That is just how to close the coach. If a student asks about it, explain it. They never have to thank you, and you never need them to.

  Keep your answers SHORT and SIMPLE - no more than 2-3 sentences unless they ask for more detail.
  When you are asked for help, you will be provided with the student's code in the <files> tag and the content of the guides in the <guide> tag.

## Where students work: Codio

Students work in Codio, never some other editor or website. You can't run anything yourself, but you always know how THEY can:
- Click **🌐 Open Preview** in the menu bar at the top of Codio to see their page. After changing the HTML or CSS, refresh the preview to see the change.
- If a student asks "can you run this?" or "how do I run it?", tell them exactly that. Don't say it depends on their editor or website: it's always Codio.

## When to send them to the teacher

Suggest asking the teacher when something really needs a human: Codio itself seems broken (the button does nothing, files are missing, they can't Mark as Complete), questions about grades or deadlines, the student is upset or frustrated, or anything about their wellbeing or safety. Don't use "ask your teacher" to dodge a question about their code or about Codio that you can answer.`;

  codioIDE.coachBot.register("htmlCssHelper", "HTML/CSS Coach", onButtonPress);

  // Exit only when the whole message is a goodbye ("thanks!", "ok bye", "no thanks 🙂",
  // "i’m good thanks"). Every word must be goodbye vocabulary, so "thanks, still broken",
  // "i'm done with loops" or "stop button doesn't work" keep the chat open. "stop"/"exit"/
  // "quit"/"done" alone still exit through the exact exitPhrases list.
  const exitPhrases = ["thanks", "thank you", "bye", "goodbye", "done", "exit", "quit", "stop", "no thanks", "i'm good", "im good", "that's all", "thats all"];
  const goodbyeWords = ["thanks", "thank", "you", "thx", "ty", "bye", "goodbye", "cya", "no", "ok", "okay",
    "cool", "great", "alright", "all", "that's", "thats", "i'm", "im", "good", "done", "for", "now",
    "see", "ya", "later", "so", "much", "then", "very", "lot", "a"];
  const goodbyeCores = ["thanks", "thank", "thx", "ty", "bye", "goodbye", "cya"];
  const goodbyePhrases = ["i'm good", "im good", "i'm done", "im done", "that's all", "thats all", "see ya", "see you"];
  function isExitMessage(text) {
    if (typeof text !== "string") return false;
    if (text.indexOf("?") !== -1) return false;
    const norm = text.toLowerCase().replace(/[‘’]/g, "'").replace(/[^a-z' ]+/g, " ").replace(/\s+/g, " ").trim();
    if (!norm) return false;
    if (exitPhrases.includes(norm)) return true;
    const words = norm.split(" ");
    if (words.length > 6) return false;
    if (!words.every(function(w) { return goodbyeWords.indexOf(w) !== -1; })) return false;
    const padded = " " + norm + " ";
    return words.some(function(w) { return goodbyeCores.indexOf(w) !== -1; }) ||
      goodbyePhrases.some(function(p) { return padded.indexOf(" " + p + " ") !== -1; });
  }

  // Collect .html/.css files via codioIDE.files — context.files only lists
  // files currently OPEN in the editor, and students often ask about their CSS
  // while only the HTML file is open (or the other way around).
  // codioIDE.workspace does NOT exist in the Custom Assistant runtime;
  // codioIDE.files is the supported channel:
  // https://codio.github.io/client/codioIDE.files.html
  // Returns { entries, skipped }: entries are { path, text } blocks; skipped lists file
  // names that can't be seen at all (budget ran out, or the read failed or timed out).
  // usedChars: characters already used by open-tab files, so they count against the budget.
  async function collectProjectFiles(skipPaths, usedChars) {
    const entries = [];
    const skipped = [];
    const totalBudget = 40000;
    let used = usedChars || 0;
    const F = codioIDE.files;
    if (!F || typeof F.getStructure !== "function" || typeof F.getContent !== "function") return { entries: entries, skipped: skipped };

    let files = [];
    try {
      files = findProjectFiles(await withTimeout(F.getStructure(), 8000, "structure"), "");
    } catch (e) {
      return { entries: entries, skipped: skipped };
    }

    for (const filePath of files) {
      if (skipPaths && skipPaths.has(normalizePath(filePath))) continue;
      if (used >= totalBudget) { skipped.push(filePath); continue; }

      try {
        const content = await withTimeout(F.getContent(filePath), 8000, "read " + filePath);
        if (typeof content !== "string") { skipped.push(filePath); continue; }
        if (content.length === 0) {
          entries.push({ path: filePath, text: `File: ${filePath}\n(empty file)` });
          continue;
        }
        const maxLen = Math.min(15000, totalBudget - used);

        let text;
        if (content.length <= maxLen) {
          text = `File: ${filePath}\n${content}`;
        } else {
          text = `File: ${filePath}\n${content.slice(0, maxLen)}\n(cut off after ${maxLen} characters)`;
        }
        used += text.length;
        entries.push({ path: filePath, text: text });
      } catch (e) {
        skipped.push(filePath); // unreadable or timed out: tell the model it can't see it
      }
    }

    return { entries: entries, skipped: skipped };
  }

  function normalizePath(p) {
    return String(p).replace(/^\.\//, "").replace(/^\//, "");
  }

  // getStructure() returns a name->value MAP: a file's value is a leaf (Codio
  // uses 1), a directory's value is a nested map — not an array of nodes.
  function findProjectFiles(node, path) {
    let out = [];
    if (!node || typeof node !== "object") return out;

    for (const name in node) {
      if (!Object.prototype.hasOwnProperty.call(node, name)) continue;
      if (name.startsWith(".")) continue;
      const full = path ? `${path}/${name}` : name;
      const value = node[name];

      if (value && typeof value === "object") {
        out = out.concat(findProjectFiles(value, full));
      } else {
        const lower = name.toLowerCase();
        if (lower.endsWith(".html") || lower.endsWith(".css")) {
          out.push(full);
        }
      }
    }
    return out;
  }

  // The exact text between the <files> tags from the last buildContextMessage()
  // call. Fingerprinted each turn to detect "student changed their files".
  let lastFilesBlock = "";

  // Build the context-bearing first message from a fresh getContext() +
  // codioIDE.files read. Re-run before every ask() so the coach sees the
  // student's latest edits, not their code as of the button press.
  // isRefresh: on later turns the first question is labelled as such, so the
  // model doesn't treat it as the current one.
  async function buildContextMessage(question, isRefresh, history, session) {
    let context = {};
    try {
      context = (await withTimeout(codioIDE.coachBot.getContext(), 8000, "context")) || {};
    } catch (e) {
      if (isRefresh) throw e; // keep the previous context rather than swap in a worse one
      context = {}; // first turn: no open-tab files or guide; the project files are still read below
    }

    // Open editor files whose content we actually got (a non-string is unreadable:
    // it is left to the files reader below, and lands on "Not shown" if that fails too)
    const entries = [];
    const openPaths = new Set();
    let used = 0;
    (context.files || []).forEach(function(f) {
      if (!f || typeof f.content !== "string") return;
      const np = normalizePath(f.path);
      const text = `File: ${np}\n${f.content.length === 0 ? "(empty file)" : f.content}`;
      if (openPaths.has(np)) return; // dedupe on the normalized path
      entries.push({ path: np, text: text });
      openPaths.add(np);
      used += text.length;
    });

    const projectFiles = await collectProjectFiles(openPaths, used);
    projectFiles.entries.forEach(function(e) { entries.push(e); });

    // Sorted by path so tab switches or getStructure order can't change the block
    // (priority order above only decided what fit the budget).
    entries.sort(function(a, b) { return a.path < b.path ? -1 : (a.path > b.path ? 1 : 0); });
    let filesContent = entries.map(function(e) { return e.text; }).join("\n\n");
    if (projectFiles.skipped.length > 0) {
      filesContent += (filesContent ? '\n\n' : '') +
        "Not shown (too long to include, or couldn't be read): " + projectFiles.skipped.join(", ");
    }

    if (!filesContent) {
      filesContent = "No files available.";
    }
    lastFilesBlock = filesContent;

    const guideContent = (context.guidesPage && context.guidesPage.content)
      ? context.guidesPage.content
      : "No guide available.";

    const assignmentName = (context.assignmentData && context.assignmentData.name)
      ? context.assignmentData.name
      : null;

    const ending = isRefresh
      ? `(The student's first question in this chat was: ${question}. Their newest message is the last one below.)`
      : `The student says: ${question}`;

    return `Here are the student's files (current as of their latest question):
<files>
${filesContent}
</files>
Here is the guide content:
<guide>
${guideContent}
</guide>
${assignmentName ? `\nAssignment: ${assignmentName}\n` : ''}
${recentQuestionsBlock(history, session)}
${ending}`;
  }

  // ============================================================
  // Session log — a hidden, shared workspace file (.coach-log.json) that every
  // coach appends to (one entry per session, tagged with `coach`), summarizing
  // how students use the coaches. Dot-prefixed so it never enters the LLM
  // context. Deliberately records the student's questions: Codio's own course
  // coach-log export logs only the userPrompt field, which is empty for
  // messages-based coaches like these — this file is where the questions live.
  // Sessions are never dropped (always appended). Logging is wrapped so it can
  // never break the coach.
  // ============================================================

  const SESSION_LOG_PATH = ".coach-log.json";
  const COACH_ID = "html-css";
  const MAX_LOGGED_QUESTIONS = 50;

  // Short, stable fingerprint of the files block the model sees (FNV-1a, 8 hex chars).
  // Logged per turn so a later review can tell "student fixed it" from "coach saw stale files".
  function fingerprint(text) {
    const s = String(text || "");
    let h = 0x811c9dc5;
    for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
    return { len: s.length, hash: ("0000000" + h.toString(16)).slice(-8) };
  }

  // Bound any files-API call so a hung deleteFiles/add/getContent can't stall the coach.
  const delay = (ms) => new Promise((r) => setTimeout(r, ms));

  function withTimeout(promise, ms, label) {
    let t;
    const timeout = new Promise((_, rej) => { t = setTimeout(() => rej(new Error("timeout: " + label)), ms); });
    return Promise.race([promise, timeout]).finally(() => clearTimeout(t));
  }

  // Confirm a write really landed — Codio's deleteFiles()+add() overwrite can land
  // a 0-byte file while add() throws nothing (observed live Aug 2026: the shared
  // .coach-log.json was wiped to 0 bytes). Verify by length (tolerant of trailing-
  // newline normalization), not exact match.
  async function readbackOk(F, path, content) {
    if (typeof F.getContent !== "function") return true;
    try {
      const got = await withTimeout(F.getContent(path), 8000, "read " + path);
      return typeof got === "string" && got.length > 0 && got.length >= content.length - 4;
    } catch (e) {
      return false;
    }
  }

  // Write and VERIFY. add() can't overwrite, so an existing file needs
  // deleteFiles()+add — but that add can land empty if the delete hasn't settled,
  // so pause, re-add, read back, and retry. Never reports success on an empty write.
  async function addVerified(F, path, content) {
    try {
      await withTimeout(F.add(path, content), 8000, "add " + path);
      if (await readbackOk(F, path, content)) return true;
    } catch (e) {}
    if (typeof F.deleteFiles !== "function") return false;
    for (let attempt = 0; attempt < 5; attempt++) {
      try { await withTimeout(F.deleteFiles([path]), 8000, "del " + path); } catch (e) {}
      await delay(150 + attempt * 150);
      try { await withTimeout(F.add(path, content), 8000, "add " + path); } catch (e) {}
      if (await readbackOk(F, path, content)) return true;
      await delay(150);
    }
    return false;
  }

  async function saveSessionHistory(history) {
    const F = codioIDE.files;
    if (!F || typeof F.add !== "function") return;
    const text = JSON.stringify(history, null, 2);
    await addVerified(F, SESSION_LOG_PATH, text);
  }

  // Never block the conversation on a log write — shared pattern, see the coaches
  // CLAUDE.md "Session Logging". saveSessionHistory() is a full read-modify-rewrite
  // (deleteFiles + add) of the shared log; awaiting it in the turn loop means a
  // stalled write freezes the coach with no input box. queueSave() serializes
  // writes on a promise chain (overlapping fire-and-forget saves can't corrupt the
  // file) and is called WITHOUT await each turn; only the end-of-session flush is awaited.
  let saveChain = Promise.resolve();
  function queueSave(history) {
    saveChain = saveChain.then(function() { return saveSessionHistory(history); }).catch(function() {});
    return saveChain;
  }

  // ============================================================
  // Try-first help (strict mode), with the model's judgment and the code's memory.
  // Each reply starts with a hidden tag labelling the student's CURRENT message:
  // [[ask]] (wants the next step, the code or a check instead of trying), [[attempt]]
  // (shows or describes their own try), or [[other]]. The code keeps those labels in
  // the box's log and, before every reply, tells the model in <recent_questions> which
  // kind of help each label gets this turn: try-first when this would be the 3rd ask
  // in their last 5 questions since their last attempt, or while try-first is already on (until an attempt).
  // The tag is stripped before the student sees the reply (ask() runs with
  // stream:false, then write()) and kept in the chat history so the model keeps
  // tagging. Backstop: STRICT_SESSION_QUESTIONS questions in a session means try-first.
  // The log is per box (one student, one assignment), so nothing carries over.
  // ============================================================
  const STRICT_SESSION_QUESTIONS = 10; // backstop: questions in the current session
  const STRICT_WORKSPACE_DAYS = 14;    // only sessions that started within this many days
  const TRY_FIRST_ASKS = 3;            // asks among the last TRY_FIRST_WINDOW questions that switch it on
  const TRY_FIRST_WINDOW = 5;
  const RECENT_QUESTIONS_SHOWN = 10;   // questions listed in <recent_questions>
  const RECENT_QUESTION_CHARS = 160;   // each one cut to this length
  const MODE_LABELS = ["ask", "attempt", "other"];

  // This coach's recent questions in this box (last STRICT_WORKSPACE_DAYS days, this
  // session included), each with the label the model gave it (null if none yet).
  function recentQuestionList(history, session) {
    let total = 0;
    let items = [];
    const list = Array.isArray(history) ? history : [];
    for (let i = 0; i < list.length; i++) {
      const s = list[i];
      if (!s || typeof s !== "object" || s.coach !== COACH_ID) continue;
      const startedMs = Date.parse(s.started);
      if (s !== session && !(startedMs > Date.now() - STRICT_WORKSPACE_DAYS * 86400000)) continue;
      const qs = Array.isArray(s.questions) ? s.questions : [];
      const labels = Array.isArray(s.labels) ? s.labels : [];
      total += (typeof s.exchanges === "number" && s.exchanges >= qs.length) ? s.exchanges : qs.length;
      for (let j = 0; j < qs.length; j++) {
        if (typeof qs[j] === "string") items.push({ q: qs[j], label: MODE_LABELS.indexOf(labels[j]) !== -1 ? labels[j] : null });
      }
    }
    return { total: total, items: items };
  }

  // Which help each possible label of the CURRENT question gets this turn.
  function modeRule(history, session) {
    const recent = recentQuestionList(history, session);
    let prior = recent.items.slice(0, -1).slice(-(TRY_FIRST_WINDOW - 1));
    let lastAttempt = -1;
    prior.forEach(function(it, i) { if (it.label === "attempt") lastAttempt = i; });
    prior = prior.slice(lastAttempt + 1); // an attempt starts the count over
    const priorAsks = prior.filter(function(it) { return it.label === "ask"; }).length;
    const modes = Array.isArray(session.modes) ? session.modes : [];
    const lastMode = modes.length ? modes[modes.length - 1] : "normal";
    if ((session.exchanges || 0) >= STRICT_SESSION_QUESTIONS) {
      return { ask: "try-first", attempt: "try-first", other: "try-first", backstop: true, recent: recent };
    }
    return {
      ask: (priorAsks + 1 >= TRY_FIRST_ASKS || lastMode === "try-first") ? "try-first" : "normal",
      attempt: "normal",
      other: lastMode === "try-first" ? "try-first" : "normal",
      backstop: false,
      recent: recent
    };
  }

  // The <recent_questions> block for messages[0]. Rebuilt every turn after recordTurn().
  function recentQuestionsBlock(history, session) {
    const rule = modeRule(history, session);
    const shown = rule.recent.items.slice(-RECENT_QUESTIONS_SHOWN).map(function(it, i, arr) {
      const one = it.q.replace(/\s+/g, " ").trim();
      const cut = one.length > RECENT_QUESTION_CHARS ? one.slice(0, RECENT_QUESTION_CHARS) + "..." : one;
      const tag = (i === arr.length - 1) ? "[current]" : "[" + (it.label || "?") + "]";
      return (i + 1) + ". " + tag + " " + cut;
    });
    const big = function(m) { return m === "try-first" ? "TRY-FIRST help" : "NORMAL help"; };
    return "<recent_questions>\n" +
      "Questions to you in this assignment in the last " + STRICT_WORKSPACE_DAYS + " days: " + rule.recent.total +
      ". In this session: " + (session.exchanges || 0) + ".\n" +
      (shown.length ? "Their recent questions, oldest first, with the label you gave each:\n" + shown.join("\n") : "No earlier questions.") +
      "\nFor the current question, label it and give this help:\n" +
      "- [[ask]]: " + big(rule.ask) + "\n" +
      "- [[attempt]]: " + big(rule.attempt) + "\n" +
      "- [[other]]: " + big(rule.other) + "\n" +
      "</recent_questions>";
  }

  // Reads and strips the hidden tag line. Returns the label (null if missing) and the
  // cleaned text. Tolerates ** or backtick wrappers, # or >, one closing bracket, a
  // trailing colon, and extra words like "[[ask | try-first]]".
  function readModeTag(reply) {
    const text = String(reply || "");
    const nl = text.search(/\n|$/);
    const first = text.slice(0, nl);
    let label = null;
    let rest = text;
    // Strip only the tag itself, so "[[ask]] What did you try?" keeps its words.
    const lead = first.match(/^\s*[#*_`> \t]*\[\[\s*(ask|attempt|other|try-first|normal)\b([^\]\n]{0,30}\]\]|\]{0,2})[*_`:]*[ \t]*/i);
    if (lead) {
      const w = lead[1].toLowerCase();
      label = MODE_LABELS.indexOf(w) !== -1 ? w : null;
      rest = first.slice(lead[0].length) + text.slice(nl);
    }
    const clean = rest
      .replace(/[*_`]*\[\[\s*(ask|attempt|other|try-first|normal)(\s*\|[^\]\n]{0,30})?\s*\]\][*_`:]*[ \t]*/gi, "") // stray copies
      .replace(/^\s+/, "");
    return { label: label, text: clean };
  }

  // The chat-history copy of a reply keeps its tag line (only the student's view is
  // cleaned), so the model keeps seeing itself tag every reply.
  function historyReply(tagged) {
    return "[[" + (tagged.label || "other") + "]]\n" + tagged.text;
  }

  // Call after every non-empty reply, with the rule used for this turn (from
  // modeRule(), computed when this turn's context was built) and the tag read from the
  // reply. Logs the label and the mode; the next queued save carries them.
  function recordMode(session, rule, label) {
    const mode = rule[label || "other"];
    if (!Array.isArray(session.labels)) session.labels = [];
    if (!Array.isArray(session.modes)) session.modes = [];
    // labels line up with questions: pad for any earlier question that got no reply
    while (session.labels.length < (session.questions || []).length - 1) session.labels.push(null);
    while (session.modes.length < session.labels.length) session.modes.push(null);
    if (session.labels.length < MAX_LOGGED_QUESTIONS) session.labels.push(label);
    if (session.modes.length < MAX_LOGGED_QUESTIONS) session.modes.push(mode);
    if (mode === "try-first") {
      session.strictReleased = false;
      if (!session.strict) {
        session.strict = true;
        session.strictReason = rule.backstop ? "backstop" : "model";
      }
    } else if (session.strict) {
      session.strictReleased = true; // went back to normal help after try-first
    }
    return mode;
  }

  const TRY_FIRST_PROMPT = `

## Try-first help: label each message

Each message includes <recent_questions>: the student's recent questions to you in this assignment and the label you gave each one. Start EVERY reply with one hidden tag line that labels the student's CURRENT message, then your reply on the next line:
- [[ask]]: they want you to give them the next step, the code, or a check instead of trying something themselves. Judge the meaning in any wording: "now what", "how do I do that", "what goes next", "can you tell me how to...", "is this right?", "like that?", "show me", a bare paste with no question.
- [[attempt]]: THIS message shows or describes something new they tried since your last reply (what they changed, what happened when they ran it, or their own plan), or it starts with the note that their files changed. Code that was already in their files does not make a message an attempt.
- [[other]]: anything else, including pasting a real error message, asking what something means or how something works, asking how to run their code, asking where to find a block, menu or button, or answering a question you asked.
Label the student's words, not their files. Examples: "how do I do that" [[ask]]; "like that?" [[ask]]; "show me" [[ask]]; "and then" [[ask]]; "NameError: name 'x' is not defined" [[other]]; "what does int() do?" [[other]]; "I added an if but it prints both times" [[attempt]]; "I think I should use a loop that adds 1 each time" [[attempt]].
Then give the kind of help <recent_questions> lists for that label. The student never sees the tag. Never mention it, the labels, the mode, or their question count.

Try-first help means: stay warm and keep helping with every question, but nudge them to try first.
- Same as always: explain what an error message means and which line it points to, explain an idea, give a short example with different names or data, point out a typo or missing punctuation, help them find a block, menu or button, and tell them how to run their work.
- For "what do I write", "next" or "show me" questions, first ask one short question back ("What do you think the next step is?" or "What did you try?") and wait for their answer. If they answer with a real attempt, even a wrong one, help as usual from there.
- Don't write the lesson's main step in their own work (their condition, their loop, their counter, their blocks). Show the pattern with different names and let them adapt it. If they ask twice for that step, give a parallel example, not their finished line. Fixing a typo or missing punctuation in a line they already wrote is still fine.
- After about three "next step" asks in a row, suggest they run what they have and see what happens, or ask them to explain their plan in one sentence.
- If they've been stuck on the same thing for three or more turns, kindly suggest their teacher, for example: "This one might be easier to sort out with your teacher. If you're in class, ask them now. If you're working at home, send them a message about where you're stuck." That's a suggestion, never a refusal. Keep helping too.
- Never mention a mode, a limit or how many questions they've asked, and never refuse. You're a coach who wants them to try first.`;

  // Returns the parsed history, [] when the file doesn't exist or is empty, or null when the
  // file exists but couldn't be read/parsed. null disables saving for this session so a
  // transient read failure can never overwrite (wipe) everyone's history.
  async function loadSessionHistory() {
    const F = codioIDE.files;
    if (!F || typeof F.getContent !== "function") return null;
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const text = await withTimeout(F.getContent(SESSION_LOG_PATH), 8000, "read log");
        if (typeof text !== "string" || !text.trim()) return [];
        const parsed = JSON.parse(text);
        return Array.isArray(parsed) ? parsed : null;
      } catch (e) {
        await delay(300);
      }
    }
    // Both reads failed: only start fresh if the file really isn't there.
    try {
      if (typeof F.getStructure === "function") {
        const tree = await withTimeout(F.getStructure(), 8000, "structure");
        if (tree && typeof tree === "object" && Object.keys(tree).length > 0 && !(SESSION_LOG_PATH in tree)) return [];
      }
    } catch (e) {}
    return null;
  }

  async function onButtonPress() {
    const fullSystemPrompt = systemPrompt + TRY_FIRST_PROMPT; // always in the prompt; the code tells the model per turn which help each label gets
    codioIDE.coachBot.write(
      `HTML/CSS Coach v${VERSION} - Ask me your HTML and CSS questions!`,
      codioIDE.coachBot.MESSAGE_ROLES.ASSISTANT
    );

    let messages = [];

    let initialInput;
    while (true) {
      try {
        initialInput = await codioIDE.coachBot.input("What can I help you with?");
      } catch (e) {
        codioIDE.coachBot.showMenu();
        return;
      }

      if ((initialInput || "").trim().toLowerCase() === "version") {
        codioIDE.coachBot.write(`Current version: ${VERSION}`, codioIDE.coachBot.MESSAGE_ROLES.ASSISTANT);
        continue;
      }

      if (!(initialInput || "").trim()) continue; // blank message: ignore

      if (isExitMessage(initialInput)) {
        // Goodbye as the very first message: no ask(), no log session.
        codioIDE.coachBot.write("Okay, bye! Come back any time you want help.");
        codioIDE.coachBot.showMenu();
        return;
      }

      break;
    }

    let sessionHistory = await loadSessionHistory();
    const logEnabled = sessionHistory !== null;
    if (!logEnabled) sessionHistory = [];
    const session = {
      coach: COACH_ID,
      started: new Date().toISOString(),
      updated: null,
      ended: null,
      coachVersion: VERSION,
      exchanges: 0,
      questions: [],
      contextFingerprints: [],
      failedReplies: 0,
      strict: false,
      strictReason: null,
      strictReleased: false,
      modes: [],
      labels: []
    };
    sessionHistory.push(session);

    async function recordTurn(question) {
      session.exchanges += 1;
      if (session.questions.length < MAX_LOGGED_QUESTIONS) {
        session.questions.push(String(question).slice(0, 300));
      }
      session.updated = new Date().toISOString();
      if (logEnabled) queueSave(sessionHistory); // fire-and-forget: never block the input loop on a log write
    }

    // lastAnsweredHash: the files hash the model last answered about. Kept in its own variable
    // (the logged array stops growing at the cap) and advanced only after a non-empty reply,
    // so a failed or empty turn still gets the "files changed" note on retry.
    let lastAnsweredHash = null;
    let currentHash = null;
    function recordFingerprint() {
      const fp = fingerprint(lastFilesBlock);
      currentHash = fp.hash;
      const changed = lastAnsweredHash !== null && fp.hash !== lastAnsweredHash;
      if (session.contextFingerprints.length < MAX_LOGGED_QUESTIONS) {
        session.contextFingerprints.push({ len: fp.len, hash: fp.hash, changed: changed });
      }
      return changed;
    }
    function recordRefreshFailed() {
      currentHash = null;
      if (session.contextFingerprints.length < MAX_LOGGED_QUESTIONS) {
        session.contextFingerprints.push({ len: null, hash: null, changed: false, refreshFailed: true });
      }
    }
    function markAnswered() { if (currentHash !== null) lastAnsweredHash = currentHash; }

    // Fallback context when the files can't be read at all: the coach still answers.
    function fallbackContext(question) {
      return "Here are the student's files (current as of their latest question):\n<files>\n" +
        "(I couldn't read the student's files just now.)\n</files>\n" + recentQuestionsBlock(sessionHistory, session) + "\nThe student says: " + question;
    }

    // First question: log it first, then build the context (a failed build can't drop it).
    await recordTurn(initialInput);
    let firstContext;
    try {
      firstContext = await buildContextMessage(initialInput, false, sessionHistory, session);
      recordFingerprint();
    } catch (e) {
      firstContext = fallbackContext(initialInput);
      recordRefreshFailed();
    }

    {
      messages.push({
          "role": "user",
          "content": firstContext
      });

      try {
        codioIDE.coachBot.showThinkingAnimation();
        const result = await codioIDE.coachBot.ask({
          systemPrompt: fullSystemPrompt,
          messages: messages
        }, { stream: false, preventMenu: true });
        const raw = (result && typeof result.result === "string") ? result.result : "";
        const tagged = readModeTag(raw);
        if (!tagged.text.trim()) {
          // Never keep an empty assistant turn: an empty message in the history can make every
          // later ask() fail too (seen live: one session got 10 empty replies in a row).
          session.failedReplies = (session.failedReplies || 0) + 1;
          codioIDE.coachBot.write("Hmm, I didn't get an answer that time. Please ask again!");
          messages.pop();          // drop the user turn that got no answer
        } else {
          recordMode(session, modeRule(sessionHistory, session), tagged.label);
          codioIDE.coachBot.write(tagged.text, codioIDE.coachBot.MESSAGE_ROLES.ASSISTANT);
          messages.push({"role": "assistant", "content": historyReply(tagged)}); // tag kept in history (never shown to the student)
          markAnswered();
        }
      } catch (e) {
        session.failedReplies = (session.failedReplies || 0) + 1;
        codioIDE.coachBot.write("Hmm, something went wrong on my end. Try asking that again!");
        messages.pop();
      } finally {
        codioIDE.coachBot.hideThinkingAnimation();
      }
    }

    while (true) {
      let input;
      try {
        input = await codioIDE.coachBot.input("What else can I help you with? (Type 'bye' when you're done.)");
      } catch (e) {
        break;
      }

      if ((input || "").trim().toLowerCase() === "version") {
        codioIDE.coachBot.write(`Current version: ${VERSION}`, codioIDE.coachBot.MESSAGE_ROLES.ASSISTANT);
        continue;
      }

      if (!(input || "").trim()) continue; // blank message: ignore

      if (isExitMessage(input)) {
        break;
      }

      let changed = false;
      if (messages.length === 0) {
        // The first reply failed, so there is no context message yet. Treat this as the
        // first question: build the context around the new input (don't lose it).
        initialInput = input;
        await recordTurn(input); // log first: a failed build can't drop the question
        let ctx;
        try {
          ctx = await buildContextMessage(input, false, sessionHistory, session);
          recordFingerprint();
        } catch (e) {
          ctx = fallbackContext(input);
          recordRefreshFailed();
        }
        messages.push({ "role": "user", "content": ctx });
      } else {
        await recordTurn(input);
        // Refresh the context block so the coach sees the student's latest edits
        try {
          const ctx = await buildContextMessage(initialInput, true, sessionHistory, session);
          changed = recordFingerprint();
          messages[0] = { "role": "user", "content": ctx };
        } catch (e) {
          // Keep the previous context if the refresh fails
          changed = false;
          recordRefreshFailed();
        }

        messages.push({
            "role": "user",
            "content": changed
              ? "(Note: the student's files have changed since your last reply.)\n\n" + input
              : input
        });
      }

      try {
        codioIDE.coachBot.showThinkingAnimation();
        const result = await codioIDE.coachBot.ask({
          systemPrompt: fullSystemPrompt,
          messages: messages
        }, { stream: false, preventMenu: true });
        const raw = (result && typeof result.result === "string") ? result.result : "";
        const tagged = readModeTag(raw);
        if (!tagged.text.trim()) {
          session.failedReplies = (session.failedReplies || 0) + 1;
          codioIDE.coachBot.write("Hmm, I didn't get an answer that time. Please ask again!");
          messages.pop();
          continue;
        }
        recordMode(session, modeRule(sessionHistory, session), tagged.label);
        codioIDE.coachBot.write(tagged.text, codioIDE.coachBot.MESSAGE_ROLES.ASSISTANT);
        messages.push({"role": "assistant", "content": historyReply(tagged)}); // tag kept in history (never shown to the student)
        markAnswered();
      } catch (e) {
        session.failedReplies = (session.failedReplies || 0) + 1;
        codioIDE.coachBot.write("Hmm, something went wrong on my end. Try asking that again!");
        messages.pop();
        continue;
      } finally {
        codioIDE.coachBot.hideThinkingAnimation();
      }

      // Keep first message (which has files + guide) + last 8 messages (4 exchanges)
      while (messages.length > 9) {
        messages.splice(1, 2); // drop the oldest assistant+user pair, keep messages[0] (context) intact
      }
    }

    session.ended = new Date().toISOString();
    if (logEnabled) await queueSave(sessionHistory); // flush queued writes (safe to await — no input follows)

    codioIDE.coachBot.write("Okay, bye! Come back any time you want help.");
    codioIDE.coachBot.showMenu();
  }
})(window.codioIDE, window);
