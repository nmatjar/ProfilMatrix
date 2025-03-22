# ProfileCoder 3.0 Parameter Reference Guide
Version 3.0 - March 2029

## Introduction

This document provides a comprehensive reference for all standard parameters in the ProfileCoder 3.0 specification. Building on previous versions, the 3.0 standard introduces critical advancements including contextual awareness, preference weighting, and competency linkage to create truly adaptive professional profiles.

## New in Version 3.0

ProfileCoder 3.0 introduces several key enhancements:

1. **Contextual Preferences** - Parameters can now be specific to different situations (e.g., client meetings vs. team interactions)
2. **Preference Weighting** - Indicate the relative importance of each preference on customizable scales
3. **Expanded Categories** - New segments for competencies and metadata
4. **Enhanced Properties** - More nuanced properties across all segments
5. **Standardized Vocabularies** - Optional reference to external standards
6. **Competency Integration** - Link preferences to specific skills and abilities

## Parameter Structure

ProfileCoder 3.0 parameters follow this hierarchical structure:
- **Categories**: Major preference domains (e.g., Work Environment, Communication)
- **Properties**: Specific aspects within each category
- **Values**: Specific settings for each property
- **Contexts**: Situations where preferences apply
- **Weights**: Relative importance of preferences

Each parameter is encoded as:
```
Category[@Context]{Property1=Value1^Weight1;Property2=Value2a+Value2b@SpecificContext^Weight2}
```

### Delimiters

- **Segment Delimiter**: `▪` (Unicode: U+25AA) - Separates major segments
- **Property Delimiter**: `;` - Separates properties within a segment
- **Key-Value Delimiter**: `=` - Connects property names to their values
- **Multiple Value Delimiter**: `+` - Indicates multiple selections for one property
- **Sub-Value Delimiter**: `,` - Represents complex values or ranges
- **Context Delimiter**: `@` - Specifies the context for a segment or property
- **Weight Delimiter**: `^` - Indicates the importance level of a preference

## Categories Overview

| Category ID | Emoji | Name | Description |
|-------------|-------|------|-------------|
| ENV | 💼 | Work Environment | Physical and organizational environment preferences |
| REL | 💕 | Values & Boundaries | Work relationship and boundary preferences |
| LOC | 📍 | Location & Mobility | Geographical preferences and mobility requirements |
| TEAM | 👥 | Team Structure | Team size and dynamics preferences |
| TIME | ⏰ | Time Management | Work hours and scheduling preferences |
| WS | 📊 | Work Style | Task execution and productivity patterns |
| COMP | 📑 | Compensation | Salary and benefits preferences |
| DEV | 📈 | Professional Development | Learning and career advancement preferences |
| VAL | ❤️ | Core Values | Fundamental professional values and motivations |
| PERS | 👤 | Personality | Working style and interpersonal traits |
| TECH | 💻 | Technology | Tool preferences and technical environment |
| COMM | 📱 | Communication | Communication channel and style preferences |
| ENER | ⚡ | Energy Management | Focus and productivity patterns |
| CREA | 🎨 | Creativity | Creative process and environment needs |
| COMP | 🏅 | Competencies | Skills and abilities linked to preferences |
| META | 📄 | Profile Metadata | Information about the profile itself |

## Complete Parameter Reference

### 1. Work Environment (💼)

Properties related to physical workspace, organizational structure, and professional appearance.

| Property | Emoji | Description | Possible Values |
|----------|-------|-------------|----------------|
| Dress Code | 👔 | Preferred workplace attire | 🎨 (Creative), 👔 (Formal), 👕 (Casual), 🧘 (Flexible) |
| Workspace | 🏢 | Primary work location | 🏢 (Office), 🏠 (Remote), 🔄 (Hybrid), 🏝️ (Anywhere), 🚀 (Coworking) |
| Remote Work | 🏠💻 | Remote work preference | 🏢 (Prefers Office), 🏠 (Fully Remote), 🔄 (Hybrid-Flexible), 🧑‍💻 (Remote-First) |
| Office Layout | 🏟️ | Preferred office environment | 🚪 (Private), 🏞️ (Open), 🧩 (Flexible/Activity-Based), 🌳 (Biophilic) |
| Noise Level | 👂 | Preferred ambient noise level | 🔇 (Quiet), 🔉 (Moderate), 🔊 (Loud), 🎧 (Controlled with Headphones) |
| Lighting | 💡 | Preferred office lighting | ☀️ (Natural), 💡 (Bright), 🌑 (Dim), 🌈 (Adjustable) |
| Tech Setup | 🖥️ | Preferred technology setup | 💻 (Laptop), 🖥️ (Desktop), 📱 (Mobile-Focused), ⚙️ (Ergonomic), ➕ (Multiple Monitors) |
| Culture | 🏢 | Preferred organizational culture | [Text Value (e.g., Innovative, Collaborative, Results-Oriented)] |

**Example with Context and Weighting**:
```
💼@Office{👔=👔^3;🏟️=🚪^5;👂=🔇^4} ▪ 💼@Remote{🏠💻=🏠^5;🖥️=💻^4;💡=☀️^3}
```
*Interpretation*: In an office context, prefers formal dress (moderate importance), private workspace (high importance), and quiet environment (high importance). When remote, strongly prefers full remote capability with good laptop setup and natural lighting.

### 2. Values & Boundaries (💕)

Properties related to work-life balance, boundaries, and relationship preferences.

| Property | Emoji | Description | Possible Values |
|----------|-------|-------------|----------------|
| Work Boundaries | 🛡️ | Level of separation between work and personal life | 🔓 (Open), 🔒 (Strict), ⚖️ (Balanced), ⏰ (Time-Specific) |
| Workplace Relationships | 💕 | Preference for social connections at work | 👥 (Professional), 🤝 (Friendly), 🚫 (Minimal), 🤗 (Collaborative Social) |
| Autonomy | 🧑‍💼 | Preferred level of independence | 💪 (High Autonomy), 🤝 (Collaborative Autonomy), ⚙️ (Structured Guidance) |
| Learning Autonomy | 🧠 | Preferred level of self-direction in learning | 🚀 (Self-Driven), 🧭 (Guided), 🧑‍🏫 (Mentored) |

**Example with Context and Weighting**:
```
💕{🛡️=⚖️^5;💕=🤝^3} ▪ 💕@Crunch{🛡️=🔓^4;💕=👥^2}
```
*Interpretation*: Generally maintains balanced work-life boundaries (very important) with friendly workplace relationships (moderate importance). During crunch periods, willing to have more open boundaries (important) but prefers more professional relationships (less important).

### 3. Location & Mobility (📍)

Properties related to geographic preferences, travel, and time zone considerations.

| Property | Emoji | Description | Possible Values |
|----------|-------|-------------|----------------|
| Region | 🌎 | Preferred geographic region | 🇪🇺 (Europe), 🇺🇸 (USA), 🌏 (Asia), 🌍 (Africa), 🌐 (Global), [Text Value] |
| Commute | 🚶 | Commuting preference | Y (Yes), N (No), L (Limited), [Numeric Value (Max Minutes)] |
| Travel | ✈️ | Business travel willingness | F (Frequent), O (Occasional), R (Rare), N (None), I (International), D (Domestic) |
| Community | 🏘️ | Preferred community type | Urban, Suburban, Rural, Remote, [Text Value] |
| Time Zone | 🕒 | Preferred working time zone | UTC+X (UTC offset), ⏰ (Flexible), [Text Value (Time Zone Name)] |
| Country | 🗺️ | Country preference | [Text Value] |
| City | 🏙️ | City preference | [Text Value] |
| Relocation | ⏳ | Relocation willingness | Y (Yes, Permanent), T (Yes, Temporary), N (No) |
| Time Zone Flexibility | 🌍 | Willingness to work across time zones | Y (Willing), L (Limited Overlap), N (Not Preferred) |

**Example with Context and Weighting**:
```
📍{🌎=🇪🇺^5;🚶=N^4;✈️=O^2;🕒=UTC+1^5;🗺️=Germany^5;🏙️=Berlin^4} ▪ 📍@Project{✈️=F^3;🌍=Y^3}
```
*Interpretation*: Strongly prefers working in Europe (specifically Berlin, Germany, in UTC+1), doesn't want to commute (important), and occasionally willing to travel (low importance). For specific projects, willing to travel frequently and work across time zones (moderate importance).

### 4. Team Structure (👥)

Properties related to team dynamics, collaboration styles, and leadership preferences.

| Property | Emoji | Description | Possible Values |
|----------|-------|-------------|----------------|
| Team Size | 👥 | Preferred team size | 👤 (Solo), 🙌 (Small), 👨‍👩 (Medium), 👨‍👩‍👧 (Large), [Numeric Range] |
| Communication Style | 💬 | Preferred team communication | 🤝 (Collaborative), 🗣️ (Direct), 👂 (Listening-Focused), 📝 (Written), 💻 (Digital-First) |
| Diversity | 🌍 | Team diversity preference | 🌈 (High Diversity), 🧩 (Skill Diversity), 👥 (Homogeneous), ⚖️ (Balanced) |
| Structure | 📊 | Organizational structure preference | H (Hierarchical), F (Flat), M (Matrix), N (Networked), A (Agile) |
| Decision Making | 🗺️ | Decision-making process preference | C (Consensus), D (Directive), 🔄 (Adaptive), 🤝 (Collaborative), 👤 (Individual) |
| Work Mode | 📱 | Team working mode | A (Asynchronous), S (Synchronous), H (Hybrid), V (Visual Collaboration) |
| Conflict Style | 🤝 | Preferred conflict resolution approach | C (Collaborative), A (Accommodating), D (Directive), ⚖️ (Compromising), 🚫 (Avoiding) |
| Leadership Style | 👑 | Preferred leadership approach | 💡 (Visionary), 🧑‍🏫 (Coaching), 🛠️ (Servant), ⚙️ (Bureaucratic), 🔓 (Laissez-faire) |

**Example with Context and Weighting**:
```
👥@Team{👥=🙌^5;💬=📝^4+💻^4;🌍=🧩^3;📱=A^5} ▪ 👥@Client{💬=🗣️^4;📱=S^4;🤝=C^5}
```
*Interpretation*: With team members, strongly prefers small teams with written and digital-first communication (high importance), some skill diversity (moderate importance), and fully asynchronous work (high importance). With clients, prefers direct communication and synchronous work (high importance) with a collaborative approach to conflicts (very high importance).

### 5. Time Management (⏰)

Properties related to scheduling, working hours, and time organization.

| Property | Emoji | Description | Possible Values |
|----------|-------|-------------|----------------|
| Calendar Management | 📅 | Calendar/scheduling preference | 📆 (Structured), 🔄 (Flexible), 📱 (Digital Only), 🤝 (Shared Calendars) |
| Time Tracking | ⏱️ | Time tracking preference | ⏱️ (Precise), 🔄 (Flexible), 🚫 (Minimal), 📊 (Task-Based) |
| Working Hours | 🕙 | Preferred work schedule | 🕙 (Standard 9-5), 🌅 (Early), 🌙 (Late), 🔄 (Flexible), 📅 (Core Hours) |
| Availability | 📱 | Response time expectation | 🚀 (Immediate), ⏰ (Same Day), 📅 (Within 24h), 🗓️ (Scheduled), ⏳ (Respecting Off-Hours) |
| Start Time | 🕘 | Preferred start time | 🌅 (Early Morning), ☀️ (Morning), 🔆 (Mid-Day), 🌃 (Late), 🔄 (Flexible) |
| Energy Peaks | ⚡ | Preferred times for focused work | 🌅 (Morning), 🔆 (Mid-Day), 🌃 (Evening), 🔄 (Variable) |
| Break Frequency | ⏸️ | Preferred frequency of breaks | 🔄 (Frequent Short), ⏱️ (Occasional Longer), 🚶 (As Needed), ⚙️ (Structured Intervals) |

**Example with Context and Weighting**:
```
⏰{📅=📆^4;⏱️=⏱️^3;🕙=🔄^5;📱=⏰^3} ▪ ⏰@DeadlineWeek{🕙=🌙^4;⚡=🌃^5;⏸️=🔄^4}
```
*Interpretation*: Generally prefers structured calendars (high importance), precise time tracking (moderate importance), flexible working hours (very high importance), and same-day response times (moderate importance). During deadline weeks, works late hours with evening energy peaks and frequent short breaks.

### 6. Work Style (📊)

Properties related to task execution, focus, and productivity approaches.

| Property | Emoji | Description | Possible Values |
|----------|-------|-------------|----------------|
| Pace | ⏱️ | Preferred task execution pace | 🐢 (Methodical), 🐇 (Fast-Paced), 🔄 (Variable), 🛡️ (Deadline-Driven) |
| Task Switching | 🔀 | Task switching preference | 📊 (Sequential/Focused), 🔀 (Multitasking), 🔄 (Context-Switching) |
| Supervision | 🛡️ | Preferred management oversight | 🧑‍💼 (Independent), 🤝 (Collaborative), 👁️ (Regular Check-ins), 👤 (Self-Directed) |
| Goal Setting | 🎯 | Preferred goal definition | 🎯 (Specific & Measurable), 🗺️ (Broad Direction), 📊 (Metrics-Driven), 🌱 (Iterative) |
| Problem Solving | 🔧 | Problem-solving approach | 👥 (Collaborative), 👤 (Independent), 🧪 (Experimental), 🧠 (Analytical), 🤔 (Conceptual) |
| Planning Style | 🗺️ | Planning and organization approach | 📆 (Structured & Detailed), 📝 (Flexible & Adaptable), 💡 (Strategic Overview), ⚙️ (Process-Oriented) |

**Example with Context and Weighting**:
```
📊{⏱️=🐢^4;🔀=📊^5;🛡️=🧑‍💼^5;🎯=🎯^4} ▪ 📊@Crisis{⏱️=🐇^5;🔀=🔀^4;🔧=🧠^5}
```
*Interpretation*: Generally prefers a methodical pace (high importance), sequential/focused work (very high importance), independent supervision (very high importance), and specific/measurable goals (high importance). In crisis situations, switches to fast-paced work with some multitasking and highly analytical problem-solving.

### 7. Compensation (📑)

Properties related to salary, benefits, and compensation structure.

| Property | Emoji | Description | Possible Values |
|----------|-------|-------------|----------------|
| Salary | 💰 | Salary expectation | [Numeric Value] {currency unit} |
| Benefits | 🎁 | Valued benefits | 🏥 (Healthcare), 📚 (Education), 🏖️ (PTO), 💪 (Wellness), 🏠 (Housing) |
| Vacation | 🏖️ | Vacation time preference | S (Standard), E (Extended), F (Flexible), U (Unlimited) |
| Contract | 📄 | Employment contract preference | 🏢 (Full-time), ⏱️ (Part-time), 📊 (Project-based), 🤝 (Consulting) |
| Payment Schedule | 📅 | Preferred payment frequency | M (Monthly), B (Bi-weekly), W (Weekly), 📆 (Custom) |
| Equity | 📈 | Interest in company ownership | H (High Interest), M (Moderate Interest), L (Low Interest), N (No Interest) |
| Bonus Structure | 💎 | Preferred bonus structure | I (Individual Performance), T (Team Performance), C (Company Performance), E (Equal Distribution) |

**Example with Context and Weighting**:
```
📑{💰=85000 EUR^5;🎁=📚^4+🏖️^5;🏖️=F^5;📄=🏢^5;📅=M^2;📈=H^4}
```
*Interpretation*: Expects €85,000 salary (very high importance), values education benefits (high importance) and PTO (very high importance), strongly prefers flexible vacation time and full-time employment, with monthly payments (low importance) and high interest in equity (high importance).

### 8. Professional Development (📈)

Properties related to growth, learning, and career advancement.

| Property | Emoji | Description | Possible Values |
|----------|-------|-------------|----------------|
| Learning Style | 📚 | Preferred learning approach | 💼 (On-the-job), 🎓 (Formal), 👥 (Peer), 🤖 (Self-directed) |
| Skills Focus | 🛠️ | Skills development focus | 💻 (Technical), 👥 (People), 📊 (Process), 🎨 (Creative), 🧠 (Domain) |
| Feedback Style | 💬 | Preferred feedback approach | 🏁 (Results-oriented), 📊 (Data-driven), 👥 (Peer-based), 🔄 (Continuous) |
| Recognition | 🏆 | Recognition preferences | T (Titles), R (Rewards), V (Verbal), P (Public), C (Certification) |
| Growth Path | 📈 | Career progression preference | 📊 (Vertical), 🔄 (Horizontal), 💡 (Expert/Specialist), 🌱 (Entrepreneurial) |
| Learning Frequency | 🔄 | Preferred pace of learning | 🚀 (Rapid/Continuous), ⚙️ (Steady), 🎯 (Targeted/As Needed) |
| Development Budget | 💰 | Expectation for learning resources | H (High Investment), M (Moderate Investment), L (Low Investment) |

**Example with Context and Weighting**:
```
📈{📚=🤖^5;🛠️=💻^5+🧠^4;💬=📊^4;🏆=C^3;📈=💡^5;🔄=🚀^4}
```
*Interpretation*: Strongly prefers self-directed learning (very high importance) focused on technical skills (very high importance) and domain knowledge (high importance), with data-driven feedback (high importance), recognition through certifications (moderate importance), specialist career path (very high importance), and rapid/continuous learning (high importance).

### 9. Core Values (❤️)

Properties related to fundamental values and motivations.

| Property | Emoji | Description | Possible Values |
|----------|-------|-------------|----------------|
| Work-Life Balance | ⚖️ | Priority balancing | 💼 (Work-focused), 🏠 (Life-focused), ⚖️ (Balanced), 🔄 (Context-Dependent) |
| People Orientation | 👥 | Social orientation at work | 💡 (Task-oriented), 👥 (People-oriented), 🤝 (Relationship-building) |
| Work Ethics | 🛡️ | Primary ethical drivers | ✅ (Integrity), 🤝 (Collaboration), 📖 (Standards), 🏆 (Excellence), 🌱 (Growth) |
| Purpose | 🎯 | Primary career motivation | 💰 (Financial), 🌍 (Impact), ❤️ (Passion), 🏆 (Achievement), 📚 (Learning) |
| Social Responsibility | 🌍 | Importance of social impact | S (Social), E (Environmental), G (Governance), N (Not priority) |
| Ethics Alignment | 🧭 | Importance of aligned values | H (High), M (Medium), L (Low) |
| Mission Orientation | 🚀 | Connection to organizational mission | H (High), M (Medium), L (Low) |

**Example with Context and Weighting**:
```
❤️{⚖️=⚖️^5;👥=💡^3;🛡️=✅^5+🏆^4;🎯=🌍^5;🌍=S^4+E^4;🧭=H^5}
```
*Interpretation*: Strongly values work-life balance (very high importance), is somewhat task-oriented (moderate importance), prioritizes integrity (very high importance) and excellence (high importance), is motivated by making an impact (very high importance) particularly in social and environmental areas (high importance), and places high importance on ethical alignment with the organization.

### 10. Personality (👤)

Properties related to working style and interpersonal traits.

| Property | Emoji | Description | Possible Values |
|----------|-------|-------------|----------------|
| Learning Approach | 📖 | Information processing preference | V (Visual), A (Auditory), K (Kinesthetic), R (Reading/Writing), M (Multimodal) |
| Thinking Style | 👤 | Decision-making approach | 🧠 (Analytical), ❤️ (Emotional), ⚖️ (Balanced), 🔄 (Adaptive) |
| Energy Management | 📊 | Energy and focus patterns | 🔥 (High Intensity), 🧘 (Steady), 🔄 (Cyclical), 📈 (Progressive) |
| Change Adaptation | 🔄 | Response to change | ⬆️ (Progressive), ⚖️ (Moderate), ⬇️ (Conservative), 📊 (Analytical) |
| Idea Generation | 💡 | Approach to new ideas | 💥 (Disruptive), 🔄 (Incremental), 🧩 (Integrative), 🌱 (Organic) |
| Risk Tolerance | 📈 | Comfort with uncertainty | 📈 (High), ⚖️ (Moderate), 📉 (Low), 🧮 (Calculated) |
| Social Battery | ❤️ | Social interaction preference | E (Extroverted), I (Introverted), A (Ambivert), SR (Social Recharge) |
| Conflict Style | 🔄 | Conflict resolution approach | C (Collaborative), A (Accommodating), D (Directive), CP (Competitive), AV (Avoidant) |
| Strengths | ⭐ | Core professional strengths | A (Analysis), I (Innovation), E (Execution), L (Leadership), R (Relationship) |
| Stress Response | 🧘 | Typical reaction to pressure | 🧘 (Calm), 🔥 (Energized), 🔄 (Adaptive), 🚨 (Alert) |

**Example with Context and Weighting**:
```
👤{📖=V^4;👤=🧠^5;📊=🧘^3;🔄=⬆️^4;💡=🧩^5;📈=🧮^4;❤️=I^4;🔄=C^3} ▪ 👤@HighPressure{📊=🔥^5;🧘=🔥^4}
```
*Interpretation*: Generally a visual learner (high importance), highly analytical thinker (very high importance), with steady energy (moderate importance), progressive in adapting to change (high importance), integrative in idea generation (very high importance), calculated risk-taker (high importance), introverted (high importance), and collaborative in conflicts (moderate importance). Under high pressure, becomes high intensity in energy management and energized in stress response.

### 11. Technology (💻)

Properties related to technical preferences and digital tools.

| Property | Emoji | Description | Possible Values |
|----------|-------|-------------|----------------|
| Operating System | 🖥️ | Preferred OS platform | 🟩 (Windows), 🍎 (macOS), 🐧 (Linux), 🤖 (Android), 📱 (iOS), 🌐 (Cross-Platform) |
| Hardware | 💻 | Hardware preference | 🦊 (Desktop), 🦫 (Laptop), 📱 (Mobile), 🖥️➕ (Multiple Monitors), ⚙️ (Specific Hardware) |
| Storage | 🗄️ | Data storage preference | 🟦 (Cloud), 🟠 (Local), 🟢 (Hybrid), 🔒 (Encrypted), [Text (Provider)] |
| Network | 🖧 | Network environment | 🐍 (VPN), 🔒 (Secure), 🌐 (Open), 📶 (High Bandwidth) |
| Tools | 🔧 | Preferred software tools | 📝 (Text-Based), 🎨 (Visual), 📊 (Data Analysis), 🤖 (Automation), [Text] |
| Methodologies | ⚙️ | Preferred development/project methodologies | Agile, Scrum, Kanban, Waterfall, Lean, [Text] |
| Security Protocols | 🔒 | Security preferences and requirements | H (High), M (Medium), L (Low), Z (Zero Trust), [Text] |
| Tech Complexity | 🧩 | Preferred technology complexity | S (Simple/Minimalist), M (Moderate), C (Complex/Advanced) |

**Example with Context and Weighting**:
```
💻{🖥️=🍎^5;💻=🦫^5;🗄️=🟦^4;🖧=🐍^4;🔧=📝^4+🤖^5;⚙️=Agile^5} ▪ 💻@DataAnalysis{🔧=📊^5;🧩=C^4}
```
*Interpretation*: Strongly prefers macOS (very high importance) on a laptop (very high importance), with cloud storage (high importance), VPN networking (high importance), text-based tools (high importance) and automation tools (very high importance), using Agile methodologies (very high importance). When doing data analysis specifically, prefers data analysis tools (very high importance) with complex/advanced technology (high importance).

### 12. Communication (📱)

Properties related to communication channels, response times, and meeting preferences.

| Property | Emoji | Description | Possible Values |
|----------|-------|-------------|----------------|
| Channel | 📱 | Preferred communication medium | 📧 (Email), 💬 (Chat), 📞 (Voice), 📹 (Video), 🤝 (In-Person), [Text (Platform)] |
| Response Time | ⏱️ | Expected response timeframe | 🚀 (Immediate), ⏰ (Same Day), 📅 (Within 24h), 🗓️ (Scheduled), ⏳ (Respectful of Boundaries) |
| Content Format | 📝 | Preferred communication format | 📊 (Structured), 📈 (Visual), 📄 (Detailed), 💡 (Conceptual), 🔄 (Adaptive) |
| Meeting Preference | 👥 | Preferred meeting format | 👤 (1:1), 👥 (Small Group), 👨‍👩‍👧 (Large Group), 🚫 (Minimize Meetings), 🚶 (Walking Meetings) |
| Feedback Style | 🗣️ | Preferred feedback approach | D (Direct), C (Constructive), P (Positive), DD (Data-Driven), F (Formal) |
| Listening Style | 👂 | Listening approach | A (Active), E (Empathetic), S (Solution-Oriented), C (Critical), R (Reflective) |
| Documentation | 📄 | Preference for record-keeping | H (High Detail), M (Moderate Detail), L (Low Detail), N (None) |
| Language | 🌐 | Preferred communication language | [ISO Language Code(s)], N (Native Only), F (Fluent Only) |

**Example with Context and Weighting**:
```
📱@Team{📱=💬^5;⏱️=⏰^4;📝=📊^4;👥=👤^3} ▪ 📱@Client{📱=📧^5+📹^4;⏱️=📅^3;📝=📄^5;👥=👥^4;📄=H^5}
```
*Interpretation*: With team members, strongly prefers chat communication (very high importance), same-day responses (high importance), structured content (high importance), and one-on-one meetings (moderate importance). With clients, prefers email (very high importance) and video calls (high importance), 24-hour response times (moderate importance), detailed content (very high importance), small group meetings (high importance), and highly detailed documentation (very high importance).

### 13. Energy Management (⚡)

Properties related to focus, productivity patterns, and work rhythms.

| Property | Emoji | Description | Possible Values |
|----------|-------|-------------|----------------|
| Focus Pattern | 🔍 | Attention pattern | 🔄 (Flow State), ⏱️ (Time-boxed), 🎯 (Sprint-based), 🧩 (Task Batching) |
| Productivity Cycles | 🔄 | Energy fluctuation pattern | 🌅 (Morning), 🌃 (Night), ☀️ (Daytime), 🌙 (Evening), 🔄 (Variable) |
| Break Pattern | ⏸️ | Rest and recovery style | 🔄 (Frequent Short), ⏱️ (Scheduled Longer), 🚶 (Active), 🧘 (Mindful), 🌱 (As Needed) |
| Distraction Tolerance | 🔇 | Environmental noise tolerance | 🔇 (Low), 🔉 (Moderate), 🔊 (High), 🎧 (With Tools) |
| Recharge Style | 🔋 | Preferred energy recovery | 👤 (Solitude), 👥 (Social), 🌳 (Nature), 🧘 (Relaxation), 🏃 (Physical), [Text] |
| Focus Environment | 🏞️ | Ideal setting for concentrated work | 🏠 (Home), 🏢 (Office), 📚 (Library), 🏞️ (Outdoors), 🍵 (Café), [Text] |
| Focus Blockers | 🚫 | Things that disrupt concentration | 🔊 (Noise), 📱 (Notifications), 👥 (Interruptions), 💡 (Visual Distractions), [Text] |
| Energy Boosters | ⚡ | Things that enhance focus/energy | ☕ (Caffeine), 🎵 (Music), 🚶 (Movement), 🧘 (Meditation), 📝 (Lists), [Text] |

**Example with Context and Weighting**:
```
⚡{🔍=🔄^5;🔄=🌅^5;⏸️=🔄^4;🔇=🎧^5;🔋=👤^4+🌳^3;🏞️=🏠^5;🚫=👥^5;⚡=☕^4+🎵^3}
```
*Interpretation*: Strongly prefers flow state focus (very high importance), morning productivity (very high importance), frequent short breaks (high importance), uses tools to manage noise (very high importance), recharges through solitude (high importance) and nature (moderate importance), focuses best at home (very high importance), is highly disrupted by interruptions (very high importance), and boosts energy with caffeine (high importance) and music (moderate importance).

### 14. Creativity (🎨)

Properties related to creative processes and innovation preferences.

| Property | Emoji | Description | Possible Values |
|----------|-------|-------------|----------------|
| Ideation Style | 💡 | Idea generation approach | 🔄 (Iterative), 💥 (Breakthrough), 👥 (Collaborative), 👤 (Independent) |
| Creative Environment | 🏞️ | Optimal creative setting | 🤫 (Quiet), 📣 (Stimulating), 🌿 (Natural), 🎨 (Visually Rich), 🔄 (Variable) |
| Innovation Approach | 🔍 | Method for developing solutions | 🔄 (Incremental), 🧩 (Combinatorial), 🧪 (Experimental), 🚀 (Radical) |
| Implementation Focus | 🛠️ | Primary focus in execution | 🎨 (Aesthetics), 🧠 (Functionality), ⚖️ (Balanced), 🌱 (Iterative) |
| Problem Complexity | 🧩 | Preferred problem complexity | S (Simple), M (Moderate), C (Complex), O (Open-Ended) |
| Creative Inputs | 📥 | Sources of creative inspiration | 🌐 (External Content), 👥 (People), 🧠 (Internal Reflection), 🌳 (Nature), [Text] |
| Output Medium | 📤 | Preferred creation format | 📝 (Written), 🎨 (Visual), 🎬 (Video), 🛠️ (Prototype), 💬 (Verbal), [Text] |
| Feedback Timing | ⏱️ | When feedback is most valuable | E (Early/Formative), M (Mid-process), L (Late/Refinement), A (All Stages) |

**Example with Context and Weighting**:
```
🎨{💡=👥^4;🏞️=🎨^5;🔍=🧩^4;🛠️=⚖️^3;🧩=C^5;📥=🌐^4+👥^3;📤=🎨^5;⏱️=E^4}
```
*Interpretation*: Prefers collaborative ideation (high importance), visually rich creative environments (very high importance), combinatorial innovation (high importance), balanced implementation focus (moderate importance), complex problems (very high importance), draws inspiration from external content (high importance) and people (moderate importance), prefers creating visual outputs (very high importance), and values early feedback (high importance).

### 15. Competencies (🏅)

A segment to link preferences to specific skills or competencies.

| Property | Emoji | Description | Possible Values |
|----------|-------|-------------|----------------|
| Technical Skill | 💻 | Technical competencies | [Text Value (e.g., Python, Project Management)] |
| Soft Skill | 👥 | Interpersonal competencies | [Text Value (e.g., Communication, Leadership)] |
| Process Skill | ⚙️ | Methodological competencies | [Text Value (e.g., Agile, Lean, Data Analysis)] |
| Domain Knowledge | 🎯 | Industry or domain expertise | [Text Value (e.g., Healthcare, Finance)] |
| Relates To | 🔗 | Links competency to preference | [Category].[Property] (e.g., 📱.Channel) |
| Proficiency | 📊 | Skill level | B (Basic), I (Intermediate), A (Advanced), E (Expert) |
| Interest Level | ❤️ | Interest in using/developing skill | H (High), M (Medium), L (Low) |
| Experience Years | ⏳ | Years of experience | [Numeric Value] |

**Example with Context and Weighting**:
```
🏅{💻=Python^5;📊=A^4;❤️=H^5;⏳=8;🔗=💻.Tools ▪ 👥=Communication^4;📊=I^3;❤️=M^3;🔗=📱.Content Format}
```
*Interpretation*: Has advanced proficiency in Python (very high importance) with 8 years of experience and high interest in using it, related to tool preferences. Also has intermediate communication skills (moderate importance) with medium interest, related to content format preferences.

### 16. Profile Metadata (📄)

A segment for general information about the profile itself.

| Property | Emoji | Description | Possible Values |
|----------|-------|-------------|----------------|
| Version | 📋 | ProfileCoder spec version | 3.0 |
| Created | 📅 | Profile creation date | [YYYY-MM-DD] |
| Updated | 🔄 | Last update date | [YYYY-MM-DD] |
| ID | 🆔 | Unique profile identifier | [UUID or other unique ID] |
| Context Vocab | 📚 | Vocabulary used for contexts | [URI or identifier] |
| Weight Scale | ⚖️ | Scale used for weights | [Text (e.g., 1-5, Low-High)] |
| Owner | 👤 | Profile owner identifier | [Text or URI] |
| Validation | ✅ | Profile validation status | V (Validated), P (Partial), N (Not Validated) |

**Example**:
```
📄{📋=3.0;📅=2029-02-15;🔄=2029-03-01;🆔=a1b2c3d4-e5f6;⚖️=1-5;✅=V}
```
*Interpretation*: ProfileCoder version 3.0 profile created on February 15, 2029, last updated on March 1, 2029, with unique ID a1b2c3d4-e5f6, using a 1-5 weight scale, and fully validated.

## Context Usage

In ProfileCoder 3.0, context indicators (@Context) specify the situation in which preferences apply:

### Context Levels

1. **Segment-level context**: Applies to all properties in a segment
   ```
   👥@Team{👥=🙌^5;💬=📝^4}
   ```
   *All properties in this segment apply specifically to team interactions*

2. **Property-level context**: Applies to a specific property only
   ```
   📱{📱=💬^5;⏱️=⏰^3@Urgent^5}
   ```
   *Response time changes from same-day (importance 3) to immediate (importance 5) in urgent situations*

### Common Context Types

- **Role-based**: @Management, @Individual, @Client, @Mentor
- **Activity-based**: @Meeting, @FocusWork, @Collaboration, @Presentation
- **Temporal**: @DeadlineWeek, @NormalOperations, @Crisis
- **Relational**: @Team, @Peer, @Reports, @Leadership
- **Project-based**: @ProjectX, @MaintenanceWork, @Innovation

### Context Vocabulary Standards

Organizations can define standardized context vocabularies to ensure consistency, referenced in the Profile Metadata segment.

## Weight Usage

Weights (^Weight) indicate the relative importance of preferences:

### Weight Scales

ProfileCoder 3.0 supports different weighting scales, specified in the Profile Metadata:

1. **Numeric (default)**: 1-5, where 1 is least important and 5 is most important
   ```
   💼{👔=👕^2;🏢=🏠^5}
   ```
   *Remote work (5) is much more important than casual dress code (2)*

2. **Textual**: Low-Medium-High
   ```
   💼{👔=👕^Low;🏢=🏠^High}
   ```
   *Same meaning as above using text labels*

3. **Custom**: Any scale defined in the Profile Metadata

### Weight Interpretation

1. **Hard Requirements**: Highest weight (e.g., 5 or High)
2. **Strong Preferences**: High-medium weight (e.g., 4 or Medium-High)
3. **Nice-to-haves**: Medium-low weight (e.g., 2-3 or Low-Medium)
4. **Minimal Importance**: Lowest weight (e.g., 1 or Low)

### Default Weights

If a weight is not specified, a default middle value is assumed (e.g., 3 on a 1-5 scale, or Medium on a Low-Medium-High scale).

## Example Complete Profile

```
📄{📋=3.0;📅=2029-02-15;⚖️=1-5} ▪ 
💼{👔=👕^2;🏢=🏠^5;👂=🔇^4} ▪ 
💕{🛡️=⚖️^4;🧑‍💼=💪^5} ▪ 
📍{🌎=🇺🇸^5;✈️=R^2;🕒=UTC-5^5} ▪ 
👥@Team{👥=🙌^5;💬=📝^4+💻^4;🌍=🧩^3;📱=A^5} ▪ 
👥@Client{💬=🗣️^4;📱=S^4} ▪ 
⏰{🕙=🔄^4;📱=⏰^3;⚡=🌅^5} ▪ 
📊{⏱️=🔄^4;🔀=📊^5;🛡️=🧑‍💼^5;🎯=🎯^4} ▪ 
❤️{🎯=❤️^5;🛡️=✅^5} ▪ 
💻{🖥️=🍎^5;🗄️=🟦^4+🟠^3;🔧=📝^4+🤖^5;⚙️=Agile^5} ▪ 
📱@Team{📱=💬^5;⏱️=⏰^4;📝=💡^3} ▪ 
📱@Client{📱=📧^5;⏱️=📅^3;📝=📄^4} ▪ 
⚡{🔍=🔄^5;🔄=🌅^5;⏸️=🔄^4;🔇=🎧^5} ▪ 
🏅{💻=Python^5;📊=A^4;❤️=H^5;⏳=8;🔗=💻.Tools}
```

This profile represents a senior software developer who:
- Strongly prefers remote work with a quiet environment
- Values balanced work-life boundaries with high autonomy
- Is based in the US Eastern time zone with minimal travel
- Prefers different communication approaches with team vs. clients
- Values flexible working hours with morning productivity peaks
- Prefers sequential, focused work with specific goals
- Is motivated by passion and strongly values integrity
- Has strong technical preferences including macOS, cloud storage, and text/automation tools
- Has advanced Python skills with 8 years of experience and high interest in using them

## Implementation Notes

When implementing ProfileCoder 3.0, consider these best practices:

1. **Context Management**
   - Provide clear UI for defining and selecting contexts
   - Allow users to see and edit preferences across different contexts
   - Implement context inheritance (property-level overrides segment-level)

2. **Weight Management**
   - Use visual indicators for weight (e.g., star ratings, sliders)
   - Allow for bulk weight adjustments across related preferences
   - Provide clear explanations of the weight scale in use

3. **Backward Compatibility**
   - Be able to parse earlier versions of ProfileCoder
   - Provide export options to simpler formats when needed
   - Handle missing contexts or weights gracefully

4. **UI Considerations**
   - Group preferences by context to reduce complexity
   - Use visual indicators for weight/importance
   - Provide visualization tools for comparing profiles
   - Allow filtering by context and minimum weight

5. **Data Processing**
   - Implement matching algorithms that respect weights
   - Calculate context-specific match scores
   - Support partial matches based on weighted priorities
   - Provide aggregated views across contexts

## Extending the System

ProfileCoder 3.0 supports several extension mechanisms:

1. **Custom Categories**: Create new category types with unique emoji identifiers

2. **Context Ontologies**: Develop standardized context hierarchies for specific industries

3. **Weight Algorithms**: Implement custom algorithms for processing weighted preferences

4. **Competency Integration**: Link to external skill frameworks and taxonomies

5. **Profile Evolution**: Build systems that track preference changes over time

When extending the system, maintain the basic syntax structure to ensure compatibility with standard ProfileCoder implementations.

---

© 2029 ProfileCoder Consortium
All rights reserved.