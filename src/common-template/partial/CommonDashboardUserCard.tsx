import React from 'react';
import UserContact from 'src/components/UserContact';
import USERS from '../data/userDummyData';

const CommonDashboardUserCard = () => {
	return (
		<UserContact
			name={`${USERS.SAM.name} ${USERS.SAM.surname}`}
			position='Team Lead'
			mail={`${USERS.SAM.username}@site.com`}
			phone='1234567'
			// onChat={() => router.push(`../${nonAuthPagesMenu.chat.subMenu.withListChat.path}`)}
			src={USERS.SAM.src}
			color={USERS.SAM.color}
		/>
	);
};

export default CommonDashboardUserCard;
