import React from 'react';

interface ApplicationFormProps {
  onSubmitSuccess: () => void;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ onSubmitSuccess }) => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // After form submission logic
    onSubmitSuccess();  // Trigger onSubmitSuccess after form submission
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Your form fields */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default ApplicationForm;
