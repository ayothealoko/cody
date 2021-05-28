import { UIStore } from "../UIStore";

function FileType() {
  const fileTypes = UIStore.useState((s) => s.filetypes);
  const selectedFileType = UIStore.useState((s) => s.selectedFileType);

  const handleClick = (file: string) => {
    UIStore.update((s: any) => {
      s.selectedFileType = toggleFile(file, selectedFileType);
    });
  };

  return (
    <div className="main-wrapper">
      <div className="page-description">
        <h2 className="page-description__header">File types</h2>
        <p className="page-description__copy">
          Chooses the file types you plan on working with.
        </p>
        <div className="type-display__container">
          <span className="type-display__description">Added file types</span>
          <div className="type-display">
            {selectedFileType.map((v) => {
              return (
                <span className="type-display__item" key={v}>
                  {v}
                </span>
              );
            })}
          </div>
        </div>
      </div>
      <div className="page-content">
        <FileContent
          header="Programming Languages"
          fileTypes={fileTypes.programmingLanguages}
          selectedFileTypes={selectedFileType}
          handleClick={handleClick}
        />
        <FileContent
          header="Styling languages"
          fileTypes={fileTypes.stylingLanguages}
          handleClick={handleClick}
          selectedFileTypes={selectedFileType}
        />
        <FileContent
          header="Images"
          handleClick={handleClick}
          selectedFileTypes={selectedFileType}
          fileTypes={fileTypes.images}
        />
        <FileContent
          handleClick={handleClick}
          selectedFileTypes={selectedFileType}
          header="Fonts"
          fileTypes={fileTypes.fonts}
        />
      </div>
    </div>
  );
}

interface FileContentProps {
  header: string;
  fileTypes: string[];
  selectedFileTypes: string[];
  handleClick: (file: string) => void;
}

function toggleFile(file: string, selectedType: string[]): any {
  const isSelected = selectedType.indexOf(file);

  let ans: string[] = [];
  if (isSelected !== -1) {
    // only allow what isnt equal to file
    ans = selectedType.filter((v) => v !== file);
  } else {
    // add file to selected
    ans = selectedType.concat(file);
  }

  return ans;
}

function FileContent(props: FileContentProps) {
  return (
    <div className="filetype">
      <h3 className="filetype__header">{props.header}</h3>
      <div className="filetype__content">
        {props.fileTypes.map((v) => {
          let isSelected = false;
          if (props.selectedFileTypes.indexOf(v) !== -1) {
            isSelected = true;
          }

          return (
            <button
              key={v}
              className={`filetype__item ${
                isSelected ? "filetype__item--active" : ""
              }`}
              onClick={() => props.handleClick(v)}
            >
              {v}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default FileType;
