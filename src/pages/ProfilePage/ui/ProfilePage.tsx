import React, {memo} from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import {Page} from "widgets/Page/Page";
import {EditableProfileCard} from "features/EditableProfileCard";
import {useParams} from "react-router-dom";
import {Text} from "shared/ui/Text/Text"


interface ProfilePageProps {
    className?: string;
}

const ProfilePage = ({className}: ProfilePageProps) => {
    const { id } = useParams<{ id: string }>();

    if (!id) {
        return <Text text={'Профиль не найден'} />
    }

    return (
        <Page className={classNames('', {}, [className])}>
            <EditableProfileCard id={id} />
        </Page>
    );
};

export default memo(ProfilePage);
