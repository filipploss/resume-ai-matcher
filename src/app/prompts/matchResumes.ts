export async function getMatch(resumes: string[], vacancy: string) {
  const prompt = `
Analyze the following resumes and job vacancy to create a ranked table in JSON format, ranking candidates based on their relevance to the job vacancy.

Job Vacancy:
${vacancy}

Resumes:
${resumes.join("\n\n")}

Instructions:
1. Rank all candidates based on their overall relevance to the job vacancy and assign them relevanceScore. Consider:
   - Alignment of candidate's experience, skills, and specialization with job requirements.
   - Total years of relevant experience.
   - Any unique or particularly relevant skills for the job.
   - Assign a relevanceScore of 0 to candidates whose skills, experience, and specialization are completely irrelevant to the job (e.g., a plumber applying for a software developer role).
   
2. Include all resumes in the final result, even if not highly relevant.
3. Ignore files that are not valid resumes.
4. **After calculating the relevanceScore for each candidate, ensure that the candidates are explicitly sorted by relevanceScore in descending order (from highest to lowest).**
5. **Do not translate or change the names** of candidates from their original language.

**Return only a valid JSON array**, sorted strictly by **relevanceScore** from highest to lowest, where each object represents a candidate with these fields:
- id: starting from 0
- fullName: Full Name (as it appears in the resume, without translation)
- email: Email
- linkedin: LinkedIn Profile
- specialization: Specialization
- experience: Total experience in specialization (years)
- technologies: Top 3 relevant technologies
- relevanceScore: A score from 0 to 100 indicating relevance to the job

**Important:**
- Do not add any formatting such as triple backticks, markdown, or additional text.
- Return only valid JSON without any code formatting, commentary, or explanations.
`;

  // Функция для очистки данных от ненужных символов и текста до JSON
  function cleanResponse(responseText: string) {
    // Находим первую строку, которая содержит открывающую скобку массива [
    const jsonStartIndex = responseText.indexOf('[');
    
    // Если нашли, возвращаем только содержимое начиная с открывающей скобки
    if (jsonStartIndex !== -1) {
      return responseText.slice(jsonStartIndex).replace(/```json|```/g, '').trim();
    }
    
    // Если не нашли открывающей скобки, возвращаем как есть (ошибка)
    return responseText;
  }

  // Функция для сортировки кандидатов по полю relevanceScore
  function sortCandidatesByRelevance(candidates: any[]) {
    return candidates.sort((a, b) => b.relevanceScore - a.relevanceScore);
  }

  try {
    const response = await fetch("/api/anthropic", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: prompt,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch completion");
    }

    const data = await response.json();
    
    // Очистка данных от лишнего форматирования и парсинг в JSON
    const cleanMessage = cleanResponse(data.message);
    
    // Парсинг очищенных данных в JSON
    const candidates = sortCandidatesByRelevance(JSON.parse(cleanMessage));
    
    console.log("Candidates:", candidates);
    return candidates;
  } catch (error) {
    console.error("Error fetching completion:", error);
    throw error;
  }
}
