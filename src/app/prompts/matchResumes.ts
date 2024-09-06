export async function getMatch(resumes: string[], vacancy: string) {
  const prompt = `
Please analyze the following resumes and the job vacancy to create a ranked table in JSON format, ranking candidates based on their relevance to the job vacancy.

Resumes:
${resumes.join("\n\n")}

Job Vacancy:
${vacancy}

Instructions:
1. Rank all candidates based on their overall relevance to the job vacancy. The relevance should be determined by analyzing:
   - How closely the candidate's experience, skills, and specialization align with the requirements and description of the job vacancy.
   - The candidate's professional background and total years of relevant experience for the job described in the vacancy.
   - Any relevant experience or skills that may be important for the specific job vacancy.
   - Candidates whose skills and experience are not aligned with the job vacancy should be ranked lower, regardless of their overall experience in unrelated fields.
   
2. **Include all resumes in the final result, even if they are not highly relevant.** Nonspecific or less relevant resumes should be placed at the bottom of the ranked list.
3. Ignore files that are not resumes or do not contain valid resume information.
4. **Important: Do not exclude any resumes based on their relevance**—rank all resumes from most to least relevant.

The table should include the following fields for each candidate:
- fullName: Full Name
- email: Email
- linkedin: LinkedIn Profile
- specialization: Specialization
- experience: Total experience in specialization (in years)
- technologies: Top 3 technologies the candidate is proficient in (if applicable), based on relevance to the job vacancy.

**Return the result strictly as a valid JSON array**, where each element is an object representing a candidate. Ensure that the JSON is correctly formatted, with no additional text or formatting.

`;

  try {
    const response = await fetch("/api/openai", {
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
    
    // Удаление возможных ненужных символов перед парсингом JSON
    const cleanedMessage = data.message.replace(/```json|```/g, '').trim(); // Убираем тройные кавычки
    
    // Парсинг очищенного JSON
    const candidates = JSON.parse(cleanedMessage); 
    console.log("Candidates:", candidates);
    return candidates;
  } catch (error) {
    console.error("Error fetching completion:", error);
    throw error;
  }
}
