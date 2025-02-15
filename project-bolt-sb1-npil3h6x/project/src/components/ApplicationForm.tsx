import React, { ChangeEvent, FormEvent, useState } from 'react';

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
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.description || !formData.file) {
      setError("All fields are required.");
      return;
    }
    setError(null); // Reset error

    await handleSubmit(e);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          required
        />
      </div>

      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter your description"
          required
        />
      </div>

      <div>
        <label>Upload File:</label>
        <input
          type="file"
          name="file"
          onChange={handleFileChange}
          required
        />
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button type="submit">Submit</button>
    </form>
  );
};

export default ApplicationForm;
