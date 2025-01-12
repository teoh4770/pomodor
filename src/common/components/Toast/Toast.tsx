// Create a wrapper component for react-toastify
// To encapsulate the library implementation and details to provide a consistent API across your application.button

// Allowing us to
// 1. set consistent defaults
// 2. modify or extend the API as needed.
// 3. make it easier to replace the library later if required

import { ToastContainer, ToastContainerProps } from "react-toastify";

type ToastProps = ToastContainerProps;

const Toast = (props: ToastProps) => {
  return <ToastContainer {...props} />;
};

export { Toast };
