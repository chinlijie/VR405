new gridjs.Grid({
  columns: ["User Need", "Design Input", "Design Process"],
  data: [
    ["Multiple User Interaction", "Able to interact with each other in the VR", "Users can see and respond to each other’s actions in real time"],
    ["Multiple User Interaction", "Multiplayer communication to understand each other", "Voice communication features with potential transcription function"],
    ["Realistic hospital environment", "Realistic hospital equipment and human models used during simulation", "Use existing models available from Code Blue project"],
    ["NPC Doctor to replace the doctor in the scenario", "Take over certain scenes as doctor role are scripted", "create scripts and responsive triggers for NPC doctor to response at key points"],
    ["Resuscitation scenario", "Necessary steps that need to be taken by the nurses to continue the scenario to maximize their communication skills", "Each step of the individual nurses would be storyboarded to ensure key task are completed before continuation of scenario"],
  ],
}).render(document.getElementById("table-1"));

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
