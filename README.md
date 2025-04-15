# Resume AI Matcher

An AI-powered tool that analyzes and ranks resumes against job vacancies, helping recruiters find the best candidates quickly and efficiently.

## Features

- **Resume Upload**: Upload multiple candidate resumes in PDF format
- **Job Vacancy Analysis**: Upload a job description to serve as matching criteria
- **AI-Powered Matching**: Leverages advanced AI models to analyze resume-job compatibility
- **Automated Ranking**: Ranks candidates based on relevance to the position
- **Detailed Insights**: Shows candidate contact info, experience, tech stack, and match scores
- **Visual Indicators**: Color-coded scoring system for quick assessment

## Technology Stack

- **Frontend**: Next.js, React, Material UI, Tailwind CSS
- **Backend**: Next.js API routes
- **AI Integration**:
  - OpenRouter API (supporting Llama 4 and other models)
  - Anthropic Claude API
  - OpenAI API

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- NPM or Yarn
- API keys for at least one of: Anthropic, OpenAI, or OpenRouter

### Installation

1. Clone the repository

```bash
 git clone https://github.com/yourusername/resume-ai-matcher.git
 cd resume-ai-matcher
```

2. Install dependencies

```bash
 npm install
 # or
 yarn install
```

3. Create a .env.local file with your API keys

```bash
ANTHROPIC_API_KEY=your_anthropic_key
OPENROUTER_API_KEY=your_openrouter_key

```

4. Start the development server

```bash

npm run dev

# or

yarn dev

```

5. Open http://localhost:3000 in your browser

## Usage

1. **Upload Job Vacancy**: Start by uploading a PDF of the job description
2. **Upload Resumes**: Upload multiple candidate resumes (PDF format)
3. **Analyze**: Click "Analyze and rank" to process the documents
4. **Review Results**: View the table of ranked candidates with detailed information
5. **New Analysis**: Click "new analysis" to start over with different documents

## Environment Variables

| Variable                        | Description                                     |
| ------------------------------- | ----------------------------------------------- |
| `OPENROUTER_API_KEY`            | API key for OpenRouter                          |
| `ANTHROPIC_API_KEY`             | API key for Anthropic's Claude models (optional)|


## How It Works

The Resume AI Matcher uses natural language processing to compare candidate resumes with job descriptions:

1. **Text Extraction**: Extracts text from PDF documents
2. **Content Analysis**: Analyzes both resumes and job descriptions for key information
3. **Relevance Matching**: Uses AI to determine how well each resume matches the job requirements
4. **Candidate Ranking**: Ranks candidates based on their relevance scores
5. **Data Presentation**: Displays results in an easy-to-understand table format

## Deploy on Vercel

The easiest way to deploy your Resume AI Matcher is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Material UI](https://mui.com/)
- [Anthropic Claude](https://www.anthropic.com/)
- [OpenRouter](https://openrouter.ai/)
