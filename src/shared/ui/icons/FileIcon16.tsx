import { Icon, forwardRef } from '@chakra-ui/react';
import { ComponentProps } from 'react';

export const FileIcon16 = forwardRef<ComponentProps<typeof Icon>, typeof Icon>((props, ref) => {
    return (
        <Icon
            ref={ref}
            w="16px"
            h="16px"
            color="icon.secondary"
            fill="none"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.49904 0.250092L6.7679 0.250092C5.95506 0.250085 5.29944 0.250079 4.76853 0.293456C4.2219 0.338118 3.74176 0.432477 3.29754 0.658818C2.59193 1.01834 2.01825 1.59202 1.65873 2.29763C1.43239 2.74185 1.33803 3.22199 1.29336 3.76862C1.24999 4.29953 1.24999 4.95513 1.25 5.76796V10.2322C1.24999 11.045 1.24999 11.7007 1.29336 12.2316C1.33803 12.7782 1.43239 13.2583 1.65873 13.7026C2.01825 14.4082 2.59193 14.9818 3.29754 15.3414C3.74176 15.5677 4.2219 15.6621 4.76853 15.7067C5.29944 15.7501 5.95505 15.7501 6.76788 15.7501H9.23212C10.045 15.7501 10.7006 15.7501 11.2315 15.7067C11.7781 15.6621 12.2582 15.5677 12.7025 15.3414C13.4081 14.9818 13.9818 14.4082 14.3413 13.7026C14.5676 13.2583 14.662 12.7782 14.7066 12.2316C14.75 11.7007 14.75 11.045 14.75 10.2322L14.75 6.27252C14.7504 6.02283 14.7507 5.78386 14.6947 5.55097C14.6457 5.3469 14.5649 5.15181 14.4553 4.97286C14.3301 4.76864 14.161 4.59988 13.9842 4.42354L10.5766 1.01592C10.4002 0.839144 10.2315 0.669958 10.0272 0.544812C9.84829 0.435154 9.6532 0.354346 9.44912 0.305352C9.21623 0.249439 8.97726 0.249736 8.72758 0.250046L8.50096 0.250092H8.49904ZM7.75 1.75009V4.08111C7.74999 4.48479 7.74998 4.83214 7.77334 5.11807C7.79797 5.41958 7.85228 5.7182 7.99851 6.00519C8.2171 6.4342 8.56589 6.783 8.9949 7.00159C9.2819 7.14782 9.58051 7.20212 9.88203 7.22676C10.168 7.25012 10.5153 7.25011 10.919 7.25009L13.25 7.25009V10.6501C13.25 11.9102 13.25 12.5403 13.0048 13.0216C12.7891 13.4449 12.4448 13.7891 12.0215 14.0049C11.5402 14.2501 10.9101 14.2501 9.65 14.2501H6.35C5.08988 14.2501 4.45982 14.2501 3.97852 14.0049C3.55516 13.7891 3.21095 13.4449 2.99524 13.0216C2.75 12.5403 2.75 11.9102 2.75 10.6501V5.35009C2.75 4.08997 2.75 3.45991 2.99524 2.97861C3.21095 2.55525 3.55516 2.21104 3.97852 1.99533C4.45982 1.75009 5.08988 1.75009 6.35 1.75009H7.75ZM13.1722 5.75009C13.1513 5.718 13.1096 5.67038 12.8839 5.44464L9.55546 2.11621C9.32971 1.89046 9.28209 1.8488 9.25 1.82789V4.55009C9.25 4.97013 9.25 5.18015 9.33175 5.34058C9.40365 5.48171 9.51839 5.59644 9.65951 5.66835C9.81994 5.75009 10.03 5.75009 10.45 5.75009H13.1722Z"
                fill="currentColor"
            />
        </Icon>
    );
});

FileIcon16.displayName = 'FileIcon16';
