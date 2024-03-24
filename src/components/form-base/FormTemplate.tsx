import React from "react";

interface FormTemplateProps {
  labelSize: String;
  contentSize: String;
  children: React.ReactNode;
}
const FormTemplate: React.FC<any> = ({
  labelSize,
  contentSize,
  children
}) => {
  return (
    <>
      <table className="w-full ">
        <colgroup>
          <col width={`${labelSize}%`} className={`h-80 border-l-0`} />
          <col width={`${contentSize}%`} />
        </colgroup>
        <tbody>{children}
      </tbody>
      </table>
    </>
  );
};

export default FormTemplate;
