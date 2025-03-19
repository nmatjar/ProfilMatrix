# ProfileCoder - Documentation

## Project Overview

ProfileCoder is a web application designed to generate specialized profile codes based on user preferences and work environment settings. The application provides a retro-themed terminal-like interface that allows users to select various parameters across multiple categories to generate a unique profile code.

## Project Info

**URL**: https://lovable.dev/projects/cea0334d-458b-4d53-80c3-876f0b4225e6

## Technology Stack

The application is built using the following technologies:

- **Frontend Framework**: React 18.3.1
- **Build Tool**: Vite 5.4.1
- **Language**: TypeScript 5.5.3
- **UI Components**: shadcn-ui (based on Radix UI)
- **Styling**: Tailwind CSS 3.4.11
- **Routing**: React Router DOM 6.26.2
- **Form Handling**: React Hook Form 7.53.0
- **Data Validation**: Zod 3.23.8
- **Data Fetching**: TanStack Query 5.56.2
- **Icons**: Lucide React 0.462.0
- **Notifications**: Sonner 1.5.0, Radix UI Toast

## Project Structure

```
/ProfileCoder
├── public/               # Static assets
├── src/                  # Source code
│   ├── components/       # UI components
│   │   └── ui/           # shadcn-ui components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── pages/            # Page components
│   │   ├── Index.tsx     # Main application page
│   │   └── NotFound.tsx  # 404 page
│   ├── App.tsx           # Main application component
│   ├── App.css           # Application styles
│   ├── index.css         # Global styles
│   └── main.tsx          # Application entry point
├── package.json          # Dependencies and scripts
├── vite.config.ts        # Vite configuration
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## Core Functionality

The ProfileCoder application allows users to:

1. Navigate through different categories of work preferences
2. Select options within each category
3. Generate a unique profile code based on selected options
4. Copy the generated profile code to clipboard

## Key Components

### Main Application (App.tsx)

The main application component sets up:
- React Query for data fetching
- React Router for navigation
- Toast notifications system
- Application routes

### Index Page (Index.tsx)

The main page of the application that contains:
- A retro-themed terminal-like UI
- Categories navigation sidebar
- Option selection interface
- Profile code generation and display
- Keyboard navigation support

### Categories and Options

The application organizes preferences into the following categories:

1. **Typ Miejsca Pracy (Workplace Type)**
   - Korporacja (Corporate)
   - Remote
   - Kreatywne (Creative)
   - Społeczne (Social)

2. **Mobilność (Mobility)**
   - F1 (Stała/Fixed)
   - F3 (Elastyczna/Flexible)
   - F5 (Pełna/Full)

3. **Kultura (Culture)**
   - C1 (Hierarchiczna/Hierarchical)
   - C3 (Hybrydowa/Hybrid)
   - C5 (Płaska/Flat)

4. **Potencjał (Potential)**
   - Slider from 0 to 100

5. **Transformacja (Transformation)**
   - T1 (0-20%)
   - T2 (20-40%)
   - T3 (40-60%)
   - T4 (60-80%)
   - T5 (80-100%)

6. **Dostępność (Availability)**
   - A1 (Minimalna/Minimal)
   - A2 (Ograniczona/Limited)
   - A3 (Standardowa/Standard)
   - A4 (Zwiększona/Increased)
   - A5 (Pełna/Full)

7. **Synergia (Synergy)**
   - S1 (Podstawowa/Basic)
   - S2 (Umiarkowana/Moderate)
   - S3 (Znacząca/Significant)
   - S4 (Wysoka/High)
   - S5 (Maksymalna/Maximum)

8. **Godziny Pracy (Work Hours)**
   - Input field for number of hours

9. **Lokalizacja (Location)**
   - Input field for location

10. **Dodatkowe Preferencje (Additional Preferences)**
    - **System**
      - Windows
      - MacOS
      - Linux
    - **Godziny pracy (Work Schedule)**
      - 6-14
      - 9-17
      - 12-20
      - Elastyczne (Flexible)

## Profile Code Generation

The application generates a profile code using the following format:
```
[workplace]⇄🌐.[mobility].[culture]|💫P[potential].[transformation].[availability]|🎯A→T.T[transformation].[potential]|↗️🌐⬆️.[locationMobility][locationMobility]|🌍[workplace]⇄🌐.[mobility].[culture]|⏰[workHours]h.[mobility]|💎🤖📱.A[availability]|⚡🎨💡.S[synergy]
```

Each segment represents different aspects of the user's work profile, separated by the `|` character.

## User Interface

The application features:
- A retro terminal-like interface with a black background and green text
- Keyboard navigation (arrow keys and tab)
- Category sidebar for quick navigation
- Interactive selection components (toggle groups, sliders, inputs)
- Copy to clipboard functionality
- Toast notifications for user actions

## User Experience

1. Users navigate through categories using the sidebar or arrow keys
2. For each category, users select their preferred options
3. The profile code updates in real-time as selections are made
4. Users can copy the generated profile code to clipboard with a single click
5. Toast notifications provide feedback on user actions

## Development and Deployment

### Development

To run the project locally:
```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

The development server runs on port 8080.

### Building for Production

To build the project for production:
```bash
npm run build
```

### Deployment Options

**Use Lovable**

Simply open [Lovable](https://lovable.dev/projects/cea0334d-458b-4d53-80c3-876f0b4225e6) and click on Share -> Publish.

**Custom Domain**

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)

## How to Edit This Project

There are several ways of editing your application:

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/cea0334d-458b-4d53-80c3-876f0b4225e6) and start prompting.
Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.
