import { Modal } from "./Modal";

export const FormCreateModal = () => {
  return (
    <Modal
      isVisible={true}
      title={"Create Collection"}
      onClose={function (): void {
        throw new Error("Function not implemented.");
      }}
    />
  );
};
