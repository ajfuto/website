// allowed commands
const SUPPORTED_COMMANDS = {
	help: '<span class="code">about</span>, <span class="code">certifications</span>, <span class="code">education</span>, <span class="code">experience</span>, <span class="code">skills</span>',

	about:
		'Hey there! 🙋🏻‍♂️<br>I&#39;m a Computer Science student with a passion for cybersecurity.',

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

	certifications: `<span class="code">Security</span>: CompTIA Security+ (soon!), MTA: Security Fundamentals<br>
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

let input, terminalOutput, previousInputs = [];
let inputIndex;

const app = () => {
	input = document.getElementById("userInput");
	terminalOutput = document.getElementById("terminalOutput");
	document.getElementById("dummyKeyboard").focus();
};

const execute = function executeCommand(rawInput) {
	rawInputLower = rawInput.toLowerCase();

	// this is represents each line of the terminal
	// this part is the formatted "guest@ajfu.to:~$" at the beginning of each line
	// we will add onto this for our desired output
	let output = `<div class="terminal-line"><span class="user">guest@ajfu.to</span><span class="white_console">:</span><span class="directory">~</span><span class="white_console">$</span> ${rawInput}</div>`;
	
	// do different things based on the input
	if (rawInput.length === 0) {
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
	const rawInput = input.innerHTML;
	inputIndex = previousInputs.length+1;
	

	// if Enter gets pressed, process the input further
	if (e.key === "Enter") {
		previousInputs.push(rawInput);
		if (rawInput.toLowerCase() === 'clear') {
			terminalOutput.innerHTML = `<div class=terminal-line><span class="help-msg">Type <span class="code">help</span> for a list of supported commands.</span></div>`;
		} else if (rawInput.toLowerCase() === "aj_futo_resume.pdf") {
			// open resume
			window.open("./assets/aj_futo_resume.pdf");
		} else if (rawInput.toLowerCase() === "song.mp3") {
			// open song
			window.open("https://youtu.be/dQw4w9WgXcQ");
		} else {
			// execute specific command
			execute(rawInput);
		}
		input.innerHTML = ''; // clear the buffer for the input
		return;
	}
	input.innerHTML = rawInput + e.key;
};

const backspace = function backSpaceKeyEvent(e) {
	if (e.keyCode !== 8) {
		return;
	}
	input.innerHTML = input.innerHTML.slice(
		0,
		input.innerHTML.length - 1
	);
};

const upArrow = function upArrowKeyEvent(e) {
	if (e.keyCode !== 38 || previousInputs.length == 0) {
		return;
	}

	inputIndex--;
	inputIndex = Math.max(0, inputIndex);
	input.innerHTML = previousInputs[inputIndex];
}

const downArrow = function downArrowEvent(e) {
	if (e.keyCode !== 40 || previousInputs.length == 0 || previousInputs.length == inputIndex) {
		return;
	}

	inputIndex++;
	inputIndex = Math.min(previousInputs.length-1, inputIndex);
	input.innerHTML = previousInputs[inputIndex];
}

document.addEventListener("keydown", backspace);
document.addEventListener("keydown", upArrow);
document.addEventListener("keydown", downArrow);
document.addEventListener("keypress", key);
document.addEventListener("DOMContentLoaded", app);