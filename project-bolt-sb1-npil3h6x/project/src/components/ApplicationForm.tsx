import React, { ChangeEvent, FormEvent } from 'react';

// Define the props for ApplicationForm component
interface ApplicationFormProps {
  handleSubmit: (e: FormEvent) => Promise<void>;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  formData: {
    name: string;
    description: string;
    file: File | null;
  };
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({
  handleSubmit,
  handleChange,
  handleFileChange,
  formData,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
        />
      </div>

      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter your description"
        />
      </div>

      <div>
        <label>Upload File:</label>
        <input
          type="file"
          name="file"
          onChange={handleFileChange}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default ApplicationForm;
