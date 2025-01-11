package com.example.assignment_3.controller;

import com.example.assignment_3.dto.DocumentDTO;
import com.example.assignment_3.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/files")
public class DocumentController {

    @Autowired
    private DocumentService documentService;

    // Endpoint to upload a file for a student
    @PostMapping("/upload/student/{studentId}")
    public ResponseEntity<String> uploadFileForStudent(@RequestParam("file") MultipartFile file, @PathVariable Long studentId) {
        try {
            String message = documentService.uploadFileForStudent(file, studentId);
            return ResponseEntity.ok(message);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("File upload failed: " + e.getMessage());
        }
    }

    // Endpoint to upload a file for a university
    @PostMapping("/upload/university/{universityId}")
    public ResponseEntity<String> uploadFileForUniversity(@RequestParam("file") MultipartFile file, @PathVariable Long universityId) {
        try {
            String message = documentService.uploadFileForUniversity(file, universityId);
            return ResponseEntity.ok(message);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("File upload failed: " + e.getMessage());
        }
    }

    // Endpoint to get file metadata by ID
    @GetMapping("/{fileId}")
    public ResponseEntity<DocumentDTO> getFileDetails(@PathVariable Long fileId) {
        DocumentDTO documentDTO = documentService.getFileDetails(fileId);
        return ResponseEntity.ok(documentDTO);
    }

    // Endpoint to download a file by its name
    @GetMapping("/download/{fileName}")
    public ResponseEntity<byte[]> downloadFile(@PathVariable String fileName) {
        try {
            byte[] fileContent = documentService.downloadFile(fileName);
            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Disposition", "attachment; filename=" + fileName);
            return new ResponseEntity<>(fileContent, headers, HttpStatus.OK);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Endpoint to list all documents
    @GetMapping("/")
    public ResponseEntity<List<DocumentDTO>> getAllDocuments() {
        List<DocumentDTO> documents = documentService.getAllDocuments();
        return ResponseEntity.ok(documents);
    }

    //to list all the documents uploaded by a university
    @GetMapping("/university/{universityId}")
    public ResponseEntity<List<DocumentDTO>> getDocumentsByUniversity(@PathVariable Long universityId) {
        List<DocumentDTO> documents = documentService.getDocumentsByUniversity(universityId);
        return ResponseEntity.ok(documents);
    }

    //to list all the documents uploaded by a student
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<DocumentDTO>> getDocumentsByStudent(@PathVariable Long studentId) {
        List<DocumentDTO> documents = documentService.getDocumentsByStudent(studentId);
        return ResponseEntity.ok(documents);
    }

    // Endpoint to delete a document by ID
    @DeleteMapping("/{fileId}")
    public ResponseEntity<String> deleteDocument(@PathVariable Long fileId) {
        try {
            documentService.deleteDocument(fileId);
            return ResponseEntity.ok("File deleted successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("File deletion failed: " + e.getMessage());
        }
    }
}
