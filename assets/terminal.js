// allowed commands
const SUPPORTED_COMMANDS = {
  help: '<span class="code">about</span>, <span class="code">certifications</span>, <span class="code">education</span>, <span class="code">experience</span>, <span class="code">skills</span>',

  about:
    "Hey there! 🙋🏻‍♂️<br>I&#39;m a Computer Science student with a passion for cybersecurity.",

  skills: `<span class="code">Technical</span>: Open Source Intelligence, Computer Networking, Troubleshooting<br>
		<span class="code">Languages</span>: Java, C/C++, JavaScript, Python<br>
		<span class="code">Technologies</span>: Remote Access, Active Directory, Data Structures, Algorithms`,

  education: `<span class="code"><strong>University of Central Florida</strong></span> 2023</class><br>
		B.S. Computer Science<br>
		Minors in <i>Mathematics</i> &#38 <i>Secure Computing and Networks</i><br>

		<span class="code"><strong>Atlantic Technical College</strong></span> 2019<br>
		Network Support Services &#38 High School Diploma<br>
		Valedictorian<br>
		
		<span class="code"><strong>Stanford University</strong></span> 2018<br>
		Programming Methodology & Einsteinian Physics<br>
		Undergraduate Semester | High School Student`,

  ls: "<a href='./assets/aj_futo_resume.pdf' class='terminal-line-link' target='_blank'>aj_futo_resume.pdf</a> <a href='https://youtu.be/dQw4w9WgXcQ' class='terminal-line-link' target='_blank'>song.mp3</a>",

  experience: `<span class="code"><strong>University of Central Florida</strong></span> (Oct. 2019 - Present)<br>
		IT Support Specialist<br>
		<ul>
			<li>- Providing <strong>Tier 1 and 2</strong> support for the Offices of the President, Provost, and CIO
			<li>- Supporting <strong>over 200</strong> remote and local devices and users
		</ul>`,

  certifications: `<span class="code">Security</span>: CompTIA Security+, MTA: Security Fundamentals<br>
	<span class="code">Networking</span>: CompTIA Network+, TestOut Network Pro<br>
	<span class="code">Misc.</span>: CompTIA A+`,

  // ugly formatting to get spacing right for this...
  quote: `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;___________________________________<br>
	&nbsp;&nbsp;&nbsp;&nbsp;(&nbsp;"I&nbsp;am&nbsp;only&nbsp;passionately&nbsp;curious."&nbsp;)<br>
	&nbsp;&nbsp;&nbsp;&nbsp;(&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;Albert&nbsp;Einstein&nbsp;&nbsp;)<br>
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-----------------------------------<br>
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#92;&nbsp;&nbsp;&nbsp;^__^&nbsp;<br>
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#92;&nbsp;&nbsp;(oo)&#92;_______<br>
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(__)&#92;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)&#92;/&#92;<br>
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;||----w&nbsp;|<br>
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;||&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;||
	`,
};

let input, terminalOutput, currentInput, myTerminal; // strings
let inputArray = []; // array
let inputIndex = 0; // number

const app = () => {
  input = document.getElementById("userInput");
  terminalOutput = document.getElementById("terminalOutput");
  myTerminal = document.getElementById("terminal");
  keyboard = document.getElementById("dummyKeyboard");
  document.getElementById("dummyKeyboard").focus();
};

// executes command
const execute = function executeCommand(rawInput) {
  rawInputLower = rawInput.toLowerCase();

  // this is represents each line of the terminal
  // this part is the formatted "guest@ajfu.to:~$" at the beginning of each line
  // we will add onto this for our desired output
  let output = `<div class="terminal-line"><span class="user">guest@ajfu.to</span><span class="white_console">:</span><span class="directory">~</span><span class="white_console">$</span> ${rawInput}</div>`;

  // do different things based on the input
  if (rawInput.replace(/\s/g, "").length == 0) {
    // do nothing because we're not adding anything to this line's output
    // we're just printing the "guest@ajfu.to:~$" bit
  } else if (!SUPPORTED_COMMANDS.hasOwnProperty(rawInputLower)) {
    // the entered input does not exist within COMMANDS
    output += `<div class="terminal-line">${rawInput}: command not found</div>`;
  } else {
    // input exists in commands, so add desired output
    output += SUPPORTED_COMMANDS[rawInputLower];
  }

  // add our formatted HTML output to the existing HTML
  terminalOutput.innerHTML += `<div class="terminal-line">${output}</div>`;

  // updates the scroll
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
};

// happens every time a key gets pressed
const key = function keyEvent(e) {
  myTerminal.scrollTop = myTerminal.scrollHeight;
  const rawInput = input.innerHTML;
  inputIndex = inputArray.length + 1;
  let output = `<div class="terminal-line"><span class="user">guest@ajfu.to</span><span class="white_console">:</span><span class="directory">~</span><span class="white_console">$</span> ${rawInput}</div>`;

  // if Enter gets pressed, process the input further
  if (e.key === "Enter") {
    keyboard.value = '';
    // only add the current rawInput to the previousInputs if it isn't blank
    // basically says:
    // if (we replace every whitespace character in our rawInput with nothing, and the length of that resultant string is NOT zero)
    // then we push the input to our inputArray
    if (rawInput.replace(/\s/g, "").length != 0) {
      inputArray.push(rawInput);
      currentInput = "";
    }

    // process special cases (clear, resume, song)
    // else, pass rawInput to execute function
    if (rawInput.toLowerCase() === "clear") {
      terminalOutput.innerHTML = `<div class=terminal-line><span class="help-msg">Type <span class="code">help</span> for a list of supported commands.</span></div>`;
    } else if (rawInput.toLowerCase() === "aj_futo_resume.pdf") {
      window.open("./assets/aj_futo_resume.pdf"); // opens resume
      terminalOutput.innerHTML += `<div class="terminal-line">${output}</div>`;
    } else if (rawInput.toLowerCase() === "song.mp3") {
      window.open("https://youtu.be/dQw4w9WgXcQ"); // opens song
      terminalOutput.innerHTML += `<div class="terminal-line">${output}</div>`;
    } else {
      // execute specific command
      execute(rawInput);
    }

    input.innerHTML = ""; // clear the buffer for the input
    myTerminal.scrollTop = myTerminal.scrollHeight;
    return;
  }

  currentInput = rawInput + e.key;
  input.innerHTML = rawInput + e.key;
  myTerminal.scrollTop = myTerminal.scrollHeight;
};

// function to deal with backspace being pressed
const backspace = function backSpaceKeyEvent(e) {
  if (e.keyCode !== 8) {
    return;
  }
  input.innerHTML = input.innerHTML.slice(0, input.innerHTML.length - 1);
};

// function to deal with the up arrow being pressed, emulating terminal behavior
const upArrow = function upArrowKeyEvent(e) {
  if (e.keyCode !== 38 || inputArray.length == 0) {
    return;
  }
  inputIndex--;
  inputIndex = Math.max(0, inputIndex);
  input.innerHTML = inputArray[inputIndex];
};

// function to deal with the down arrow being pressed, emulating terminal behavior
const downArrow = function downArrowEvent(e) {
  if (
    e.keyCode !== 40 ||
    inputArray.length == 0 ||
    inputArray.length == inputIndex
  ) {
    return;
  }

  inputIndex++;
  if (inputIndex > inputArray.length - 1) {
    input.innerHTML = currentInput;
    inputIndex = Math.min(inputArray.length, inputIndex);
  } else {
    input.innerHTML = inputArray[inputIndex];
  }
};

document.addEventListener("keydown", backspace);
document.addEventListener("keydown", upArrow);
document.addEventListener("keydown", downArrow);
document.addEventListener("keypress", key);
document.addEventListener("DOMContentLoaded", app);
