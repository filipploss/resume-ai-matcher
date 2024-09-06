"use client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import FileUpload from "./components/FileUpload";
import { getMatch } from "./prompts/matchResumes";

export default function Home() {
  const [vacancy, setVacancy] = useState<string[]>([]);
  const [resumes, setResumes] = useState<string[]>([]);
  const [candidates, setCandidates] = useState<any[]>([]); // Хранение данных кандидатов
  console.log("candidates", candidates);
  const handleMatchClick = async () => {
    try {
      const matchResult = await getMatch(resumes, vacancy[0]);
      console.log("matchResult", matchResult); // Предполагается, что vacancy - это массив с одним элементом
      setCandidates(matchResult); // Установка данных кандидатов в состояние
    } catch (error) {
      console.error("Error matching resumes:", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Box display="flex" flexDirection="column" mb={4}>
        <h3>Vacancy</h3>
        <FileUpload setFiles={setVacancy} multiple={false} type='vacancy'/>
      </Box>
      <Box display="flex" flexDirection="column" mb={4}>
        <h3>Resumes</h3>
        <FileUpload setFiles={setResumes} multiple type='resumes'/>
      </Box>
      {candidates.length > 0 && (
        <TableContainer component={Paper} style={{ marginTop: "20px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Full Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>LinkedIn Profile</TableCell>
                <TableCell>Specialization</TableCell>
                <TableCell>Experience (Years)</TableCell>
                <TableCell>Top 3 Technologies</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {candidates.map((candidate, index) => (
                <TableRow key={index}>
                  <TableCell>{candidate.fullName}</TableCell>
                  <TableCell>{candidate.email}</TableCell>
                  <TableCell>{candidate.linkedin}</TableCell>
                  <TableCell>{candidate.specialization}</TableCell>
                  <TableCell>{candidate.experience}</TableCell>
                  <TableCell>{candidate.technologies.join(", ")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Box display="flex" flexDirection="column" mb={4}>
        <Button
          onClick={handleMatchClick}
          variant="contained"
          disabled={!resumes.length || !vacancy.length}
        >
          Analyze and rank
        </Button>
      </Box>
    </main>
  );
}
