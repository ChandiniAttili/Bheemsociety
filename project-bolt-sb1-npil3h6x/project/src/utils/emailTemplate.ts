// utils/emailTemplate.ts
import { FormData } from '../types/form';

export function generateEmailHTML(formData: FormData): string {
  return `
    <html>
      <head>
        <style>
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <h1>New Job Application</h1>
        
        <h2>Personal Information</h2>
        <table>
          <tr><th>Full Name</th><td>${formData.firstName} ${formData.lastName}</td></tr>
          <tr><th>Father's Name</th><td>${formData.fatherName}</td></tr>
          <tr><th>Date of Birth</th><td>${formData.dateOfBirth}</td></tr>
          <tr><th>Gender</th><td>${formData.gender}</td></tr>
          <tr><th>Category</th><td>${formData.category}</td></tr>
          <tr><th>Physically Handicapped</th><td>${formData.handicapped}</td></tr>
          <tr><th>Aadhar Number</th><td>${formData.adharnumber}</td></tr>
          <tr><th>Email</th><td>${formData.email}</td></tr>
          <tr><th>Phone</th><td>${formData.phone}</td></tr>
          <tr><th>Address</th><td>${formData.address}</td></tr>
          <tr><th>City</th><td>${formData.city}</td></tr>
          <tr><th>Pincode</th><td>${formData.pincode}</td></tr>
        </table>

        <h2>Professional Information</h2>
        <table>
          <tr><th>Position Applied</th><td>${formData.position}</td></tr>
          <tr><th>Experience</th><td>${formData.experience}</td></tr>
        </table>

        <h2>Educational Information</h2>
        ${formData.tenthApplicable === 'yes' ? `
        <h3>10th Class</h3>
        <table>
          <tr><th>Board</th><td>${formData.tenthBoard}</td></tr>
          <tr><th>Year</th><td>${formData.tenthYear}</td></tr>
          <tr><th>Percentage</th><td>${formData.tenthPercentage}</td></tr>
        </table>
        ` : ''}

        ${formData.interApplicable === 'yes' ? `
        <h3>Intermediate</h3>
        <table>
          <tr><th>Board</th><td>${formData.interBoard}</td></tr>
          <tr><th>Year</th><td>${formData.interYear}</td></tr>
          <tr><th>Percentage</th><td>${formData.interPercentage}</td></tr>
        </table>
        ` : ''}

        ${formData.diplomaApplicable === 'yes' ? `
        <h3>Diploma</h3>
        <table>
          <tr><th>Board</th><td>${formData.diplomaBoard}</td></tr>
          <tr><th>Year</th><td>${formData.diplomaYear}</td></tr>
          <tr><th>Percentage</th><td>${formData.diplomaPercentage}</td></tr>
        </table>
        ` : ''}

        ${formData.graduationApplicable === 'yes' ? `
        <h3>Graduation</h3>
        <table>
          <tr><th>Board</th><td>${formData.graduationBoard}</td></tr>
          <tr><th>Year</th><td>${formData.graduationYear}</td></tr>
          <tr><th>Percentage</th><td>${formData.graduationPercentage}</td></tr>
        </table>
        ` : ''}
      </body>
    </html>
  `;
}