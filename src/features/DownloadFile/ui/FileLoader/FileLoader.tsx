import React, {memo, useRef, useState} from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import * as cls from './FileLoader.module.scss';
import {useTranslation} from "react-i18next";
import uploadIcon from "../../../../shared/assets/icons/upload.svg";
import {Icon} from "shared/ui/Icon/Icon";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import trashIcon from "../../../../shared/assets/icons/trash.svg"
import {Button, ButtonTheme} from "shared/ui/Button/Button";
import {downloadFile} from "../../model/services/downloadFile/downloadFile";

export interface FileLoaderProps {
    className?: string;
}

const FileLoader = ({className}: FileLoaderProps) => {
    const {t} = useTranslation('main');
    const dispatch = useAppDispatch();

    const inputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [error, setError] = useState<string>("");

    const allowedExtensions = ['.xls', '.xlsx'];

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            const fileExtension = file.name.slice(file.name.lastIndexOf('.'));

            if (!allowedExtensions.includes(fileExtension)) {
                setError(t("Неверный формат файла. Пожалуйста, выберите файл .xls или .xlsx."));
                setSelectedFile(null);
            } else {
                setError("");
                setSelectedFile(file);
                uploadFile(file);
            }
        }
    };

    const onChooseFile = () => {
        inputRef.current?.click();
    };

    const removeFile = () => {
        setSelectedFile(null);
        setError("");
    };

    const uploadFile = (file: File) => {
        const formData = new FormData();
        formData.append("file", file);
        dispatch(downloadFile(formData));
    };

    return (
        <div className={classNames(cls.FileInput, {}, [className])}>
            <input
                ref={inputRef}
                type="file"
                onChange={handleChange}
                style={{display: 'none'}}
            />
            <button
                className={cls.fileBtn}
                onClick={onChooseFile}
            >
                <div className={cls.wrapper}>
                    <Icon Svg={uploadIcon}/>
                    <div>
                        <p className={cls.Text}>
                            {t('Выбрать файл с устройства')}
                            </p>
                        <p className={cls.greyText}>.xls, .xlsx</p>
                    </div>
                </div>
            </button>

            {error && (
                <div className={cls.errorWrapper}>
                    <p
                        className={cls.erroText}
                    >
                        {error}</p>
                </div>
            )}

            {selectedFile && (
                <div className={cls.selectedFile}>
                    <p className={cls.FileName}>{selectedFile.name}</p>
                    <Button
                        theme={ButtonTheme.CLEAR}
                        onClick={removeFile}>
                        <span className={cls.MaterialSymbolsRounded}> <Icon className={cls.trashIco}
                                                                            Svg={trashIcon}/></span>
                    </Button>
                </div>
            )}
        </div>
    );
};

export default memo(FileLoader);
