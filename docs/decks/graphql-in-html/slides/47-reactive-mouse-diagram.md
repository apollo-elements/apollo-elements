---
name: MouseController Data Flow
attrs: alt
templateEngineOverride: njk,md
---

<!-- mermaid diagram

sequenceDiagram
    ColorPicker->>+MouseController: hostConnected()
    MouseController->>+Window: addEventListener()
    Window->>+MouseController: MouseEvent
    MouseController->>+ColorPicker: host.requestUpdate()
    ColorPicker->>+MouseController: this.mouse.pos

-->

{% include '../reactive-controller-flow.svg' %}
