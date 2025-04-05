new gridjs.Grid({
  columns: [
    { name: "User Iteration", width: "240px" },
    { name: "Prompt Strategy", formatter: cell => gridjs.html(cell), width: "240px" },
    { name: "Objective", formatter: cell => gridjs.html(cell), width: "240px" },
    { name: "Sample Prompt", formatter: cell => gridjs.html(cell), width: "240px" },
    { name: "AI Response Example", formatter: cell => gridjs.html(cell), width: "240px" },
    { name: "Issues Identified", formatter: cell => gridjs.html(cell), width: "240px" }
  ],
  data: [
    [
      "1 Baseline Prompting",
      "A simple, instructional prompt was provided<br>to simulate doctor-nurse interactions during Code Blue.",
      "Elicit guided clinical dialogue from AI,<br>including medication and intubation orders.",
      "You are a doctor responding to Code Blue.<br>Ask guiding questions, respond to SBAR,<br>instruct to prepare IV Adrenaline 1:10,000<br>and ETT intubation.",
      "AI Doctor: “Please continue CPR while analysing the rhythm.”<br>Compression Nurse: “I will stop CPR momentarily for rhythm analysis.”<br>AI Doctor: “Continue CPR during rhythm analysis.”",
      "AI gave clinically incorrect instructions.<br>CPR must be paused briefly for rhythm analysis.<br>This posed a risk of misinforming users."
    ],
    [
      "2 Error-Based Prompting",
      "Prompts included intentional medical errors<br>to test AI’s ability to simulate incorrect commands.",
      "Assess whether the AI can recognise<br>or respond appropriately to deliberate errors.",
      "Instruct the nurse to continue CPR<br>while analysing rhythm (which is incorrect).",
      "AI Doctor: “Continue CPR while I analyse the rhythm.”<br>Nurse: “We should stop CPR for accurate analysis.”",
      "The AI failed to adapt after correction.<br>This undermined its educational value."
    ],
    [
      "3 Role-Based Prompting with Context",
      "Prompt included patient background,<br>nurse roles, and test scenarios (e.g., wrong ETT size).",
      "Simulate realistic dialogue and test AI adaptability<br>with embedded challenges.",
      "You are an educator acting as a doctor in Code Blue.<br>The patient is Mr. Wong Ah Ling, 74,<br>with ischemic heart disease.<br>Follow a non-shockable rhythm.",
      "Circulation Nurse: “Would you like to switch to manual mode?”<br>AI Doctor: “No, stay in automated mode.”<br>Compression Nurse: “I will stop CPR for rhythm analysis.”<br>AI Doctor: “Minimize interruptions. Continue compressions.”",
      "AI failed to acknowledge pause needed for rhythm checks.<br>It confused roles and offered incorrect reasoning."
    ]
  ]
}).render(document.getElementById("table-1"));

new gridjs.Grid({
  columns: [
    { name: "Feedback", width: "220px" },
    { name: "Improvements Made / In Progress", width: "600px", formatter: cell => gridjs.html(cell) }
  ],
  data: [
    [
      "Dialogue Refinement",
      "AI Doctor conversations are being rewritten to be less prescriptive and more interactive.<br>Instead of issuing direct, knowledge-check questions, the doctor now prompts critical thinking (e.g., “What should we do next?”) to allow nurses to suggest the next steps."
    ],
    [
      "Task Progress UI",
      "A side panel UI is being implemented to show task progression for each nurse role.<br>This addition helps users track completed actions and improves narrative flow across role transitions."
    ],
    [
      "Scenario Structure",
      "A short introductory segment is added to clarify scenario goals before the simulation begins.<br>A structured outro is also included to signal the end of the session."
    ],
    [
      "Screen Clutter",
      "On-screen text such as task lists and model headers is being minimised to reduce visual clutter,<br>maintaining a cleaner VR interface."
    ],
    [
      "Speech Header Visibility",
      "Header labels indicating the active speaker are now styled with higher contrast<br>to enhance visibility and intuitiveness during role-switching or live conversation."
    ]
  ],
  style: {
    table: {
      width: '100%'
    },
    td: {
      whiteSpace: 'normal',
      wordBreak: 'break-word',
      textAlign: 'left'
    },
    th: {
      whiteSpace: 'normal',
      wordBreak: 'break-word',
      textAlign: 'center'
    }
  }
}).render(document.getElementById("table-2"));


class TableComponent extends HTMLElement {
  static get observedAttributes() {
    return ["subtitle"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, _, newValue) {
    this[name] = newValue;
  }

  render() {
    const div = document.createElement("div");
    div.innerHTML = `
    <slot></slot>
    <sub>${this.subtitle}</sub>
    <style>
      :host {
        display: block;
        text-align: center;
      }
  
      ::slotted(h1) {
        font-size: 2rem;
        white-space: normal;
        overflow-wrap: break-word;
        text-align: center;
        max-width: 100%;
        padding: 1rem;
      }
  
      sub {
        font-size: 1rem;
        font-style: italic;
      }
    </style>
  `;

    this.shadowRoot.appendChild(div);
  }
}

customElements.define("table-component", TableComponent);
