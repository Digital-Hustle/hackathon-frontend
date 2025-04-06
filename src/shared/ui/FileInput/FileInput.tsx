// import React, { useRef, useState } from 'react';
// import { classNames } from "shared/lib/classNames/classNames";
// import * as cls from './FileInput.module.scss';
// import { useTranslation } from "react-i18next";
// import uploadIcon from "../../assets/icons/upload.svg";
// import { Icon } from "shared/ui/Icon/Icon";
// import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
// import trashIcon from "../../assets/icons/trash.svg";
// import {Button, ButtonTheme} from "shared/ui/Button/Button";
// // import { useAppDispatch } from "shared/hooks"; // подключение диспатча
// // import { updateFileData } from "../../store/actions"; // допустим, это ваша функция для отправки данных
//
// interface FileInputProps {
//     className?: string;
// }
//
// export const FileInput = ({ className }: FileInputProps) => {
//     const { t } = useTranslation();
//     const dispatch = useAppDispatch();
//     const inputRef = useRef<HTMLInputElement>(null);
//     const [selectedFile, setSelectedFile] = useState<File | null>(null);
//     const [error, setError] = useState<string>("");
//
//     // Допустимые расширения файлов
//     const allowedExtensions = ['.xls', '.xlsx'];
//
//     const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         if (event.target.files && event.target.files.length > 0) {
//             const file = event.target.files[0];
//             const fileExtension = file.name.slice(file.name.lastIndexOf('.'));
//
//             // Проверка на допустимые расширения
//             if (!allowedExtensions.includes(fileExtension)) {
//                 setError("Неверный формат файла. Пожалуйста, выберите файл .xls или .xlsx.");
//                 setSelectedFile(null); // сбрасываем выбранный файл
//             } else {
//                 setError(""); // очищаем ошибку
//                 setSelectedFile(file);
//                 uploadFile(file); // отправляем файл
//             }
//         }
//     };
//
//     const onChooseFile = () => {
//         inputRef.current?.click();
//     };
//
//     const removeFile = () => {
//         setSelectedFile(null);
//         setError(""); // сбрасываем ошибку
//     };
//
//     const uploadFile = (file: File) => {
//         const formData = new FormData();
//         formData.append("file", file);
//
//         // Отправка файла с помощью dispatch
//         // dispatch(updateFileData(formData));
//     };
//
//     return (
//         <div className={classNames(cls.FileInput, {}, [className])}>
//             <input
//                 ref={inputRef}
//                 type="file"
//                 onChange={handleChange}
//                 style={{ display: 'none' }}
//             />
//             <button
//                 className={cls.fileBtn}
//                 onClick={onChooseFile}
//             >
//                 <div className={cls.wrapper}>
//                     <Icon Svg={uploadIcon} />
//                     <div>
//                         <p className={cls.Text}>Выбрать файл с устройства</p>
//                         <p className={cls.greyText}>.xls, .xlsx</p>
//                     </div>
//                 </div>
//             </button>
//
//             {error && (
//                 <div className={cls.errorWrapper}>
//                     <p
//                         className={cls.erroText}
//                     >
//                         {error}</p>
//                 </div>
//             )}
//
//             {selectedFile && (
//                 <div className={cls.selectedFile}>
//                     <p className={cls.FileName}>{selectedFile.name}</p>
//                     <Button
//                         theme={ButtonTheme.CLEAR}
//                         onClick={removeFile}>
//                         <span className={cls.MaterialSymbolsRounded}> <Icon className={cls.trashIco} Svg={trashIcon}/></span>
//                     </Button>
//                 </div>
//             )}
//         </div>
//     );
// };
