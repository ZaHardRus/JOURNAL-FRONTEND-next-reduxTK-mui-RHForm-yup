import React from 'react';
import clsx from 'clsx';
import {LeftMenu} from '../components/LeftMenu';
import {useAppSelector} from "../redux/hooks";
import {selectLeftMenu} from "../redux/slices/layout";
import {Header} from "../components/Header";
import {Paper} from "@mui/material";

interface MainLayoutProps {
    hideComments?: boolean;
    contentFullWidth?: boolean;
    className?: string;
    hideMenu?: boolean
}

export const MainLayout: React.FC<MainLayoutProps> = ({
                                                          children,
                                                          contentFullWidth,
                                                          className,
                                                      }) => {
    const leftMenuStatus = useAppSelector(selectLeftMenu)

    return (
        <>
            <Header/>
            <div className={clsx('wrapper', className)}>
                {leftMenuStatus && <div className={'leftSide'}>
                    <LeftMenu/>
                </div>}
                <Paper elevation={4} className={clsx('content', {'content--full': contentFullWidth})}>{children}</Paper>
            </div>
        </>

    );
};
