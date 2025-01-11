package com.example.assignment_3.service;

import com.example.assignment_3.dto.DocumentDTO;
import com.example.assignment_3.model.Document;
import com.example.assignment_3.model.Student;
import com.example.assignment_3.model.University;
import com.example.assignment_3.repository.DocumentRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DocumentService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    private final DocumentRepository documentRepository;

    public DocumentService(DocumentRepository documentRepository) {
        this.documentRepository = documentRepository;
    }

    public String uploadFileForStudent(MultipartFile file, Long studentId) throws IOException {
        return uploadFile(file, studentId, null);
    }

    public String uploadFileForUniversity(MultipartFile file, Long universityId) throws IOException {
        return uploadFile(file, null, universityId);
    }

    private String uploadFile(MultipartFile file, Long studentId, Long universityId) throws IOException {
        // Generate unique file name
        String fileName = file.getOriginalFilename();
        Path path = Paths.get(uploadDir, fileName);
        Files.createDirectories(path.getParent());

        // Save file locally
        file.transferTo(path);

        // Create document entry
        Document document = new Document();
        document.setFileName(fileName);
        document.setFilePath(path.toString());
        document.setFileType(file.getContentType());
        document.setFileSize(file.getSize());

        // Set student or university based on the provided ID
        if (studentId != null) {
            Student student = new Student();
            student.setId(studentId); // Only set the ID to associate the relationship
            document.setStudent(student);
        }
        if (universityId != null) {
            University university = new University();
            university.setId(universityId); // Only set the ID to associate the relationship
            document.setUniversity(university);
        }

        documentRepository.save(document);
        return "File uploaded successfully!";
    }


    public byte[] downloadFile(String fileName) throws IOException {
        Path path = Paths.get(uploadDir, fileName);
        return Files.readAllBytes(path);
    }

    public DocumentDTO getFileDetails(Long fileId) {
        Document document = documentRepository.findById(fileId)
                .orElseThrow(() -> new RuntimeException("File not found"));
        return mapToDTO(document);
    }

    public List<DocumentDTO> getAllDocuments() {
        List<Document> documents = documentRepository.findAll();
        return documents.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    private DocumentDTO mapToDTO(Document document) {
        DocumentDTO dto = new DocumentDTO();
        dto.setId(document.getId());
        dto.setFileName(document.getFileName());
        dto.setFileType(document.getFileType());
        dto.setFileSize(document.getFileSize());
        dto.setFilePath(document.getFilePath());
        dto.setStudentId(document.getStudent() != null ? document.getStudent().getId() : null);
        dto.setUniversityId(document.getUniversity() != null ? document.getUniversity().getId() : null);
        return dto;
    }

    public List<DocumentDTO> getDocumentsByUniversity(Long universityId) {
        List<Document> documents = documentRepository.findByUniversityId(universityId);

        return documents.stream().map(document -> {
            DocumentDTO dto = new DocumentDTO();
            dto.setId(document.getId());
            dto.setFileName(document.getFileName());
            dto.setFilePath(document.getFilePath());


            if (document.getUniversity() != null) {
                dto.setUniversityId(document.getUniversity().getId());
            }

            return dto;
        }).collect(Collectors.toList());
    }

    public List<DocumentDTO> getDocumentsByStudent(Long studentId) {
        List<Document> documents = documentRepository.findByStudentId(studentId);

        return documents.stream().map(document -> {
            DocumentDTO dto = new DocumentDTO();
            dto.setId(document.getId());
            dto.setFileName(document.getFileName());
            dto.setFilePath(document.getFilePath());

            // Extract student ID
            if (document.getStudent() != null) {
                dto.setStudentId(document.getStudent().getId());
            }

            return dto;
        }).collect(Collectors.toList());
    }

    public void deleteDocument(Long fileId) throws IOException {
        Document document = documentRepository.findById(fileId)
                .orElseThrow(() -> new RuntimeException("File not found"));

        // Delete the file from the local storage
        Path filePath = Paths.get(document.getFilePath());
        Files.deleteIfExists(filePath);

        // Delete the document record from the database
        documentRepository.delete(document);
    }
}
