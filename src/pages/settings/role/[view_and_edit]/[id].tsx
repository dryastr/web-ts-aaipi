import React, { useState } from 'react';
import { NextPage } from 'next';
import Checks, { ChecksGroup } from 'src/components/bootstrap/forms/Checks';
import Icon from 'src/components/icon/Icon';
import RobotForm from 'src/components/robot/RobotForm';
import FORM_TYPE from 'src/constants/FORM_TYPE';
import { string } from 'yup';
import { useRouter } from 'next/router';
import { show, update } from 'src/service/settings/role';
import { FormType } from 'src/type/form-type';

const ClientPage: NextPage = () => {
	const title = 'Roles & Permissions';

	const router = useRouter();
	const [permissions, setPermissions] = useState<number[]>([]);

	const customTemplate = ({ responseBE, checkPermission }: any) => {
		return (
			<div className='col-12'>
				<div className='table-responsive'>
					<table className='table table-modern'>
						<tbody>
							{responseBE?.permissions_mapping?.map((item: any) => {
								return (
									<React.Fragment key={`tr-title-${item.title}`}>
										<tr>
											<td colSpan={2}>
												<h6>{item.title}</h6>
											</td>
										</tr>
										{Object.keys(item.permissions).map(
											(itemPermission: any) => {
												return (
													<tr key={`tr-${itemPermission}`}>
														<td>
															&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
															<Icon
																icon='ArrowRightAlt'
																style={{
																	fontSize: 15,
																}}
															/>
															&nbsp;&nbsp;&nbsp;
															<b>{itemPermission}</b>
														</td>
														<td>
															<ChecksGroup>
																{item.permissions[
																	itemPermission
																].map((itemForm: any) => {
																	const permissionsMapping: number[] =
																		permissions;
																	const isInline = true;
																	return (
																		<b
																			key={`permission-check-${itemForm.permission_id}`}>
																			<Checks
																				disabled={
																					router.query
																						.view_and_edit ===
																						'view' &&
																					checkPermission(
																						'View',
																					)
																				}
																				type='checkbox'
																				id={String(
																					itemForm.permission_id,
																				)}
																				label={
																					itemForm.name
																				}
																				name={String(
																					itemForm.permission_id,
																				)}
																				value={
																					itemForm.permission_id
																				}
																				onChange={(
																					e: any,
																				) => {
																					if (
																						!permissionsMapping.includes(
																							itemForm.permission_id,
																						) &&
																						e.target
																							.checked
																					) {
																						permissionsMapping.push(
																							itemForm.permission_id,
																						);
																					} else {
																						permissionsMapping.splice(
																							permissionsMapping.indexOf(
																								itemForm.permission_id,
																							),
																							1,
																						);
																					}
																					setPermissions([
																						...permissionsMapping,
																					]);
																				}}
																				checked={permissionsMapping.includes(
																					itemForm.permission_id,
																				)}
																				isInline={isInline}
																			/>
																		</b>
																	);
																})}
															</ChecksGroup>
														</td>
													</tr>
												);
											},
										)}
									</React.Fragment>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		);
	};

	// Setup Form Template
	const form: FormType[] = [
		{
			type: FORM_TYPE.INPUT_TEXT,
			name: 'name',
			label: 'Role',
			grid: [6, 6, 12],
			validationSchema: string().required(`Role wajib diisi`),
			defaultValue: ({ responseBE }) => {
				return responseBE.name;
			},
			readOnly: true,
		},
		{
			type: FORM_TYPE.INPUT_TEXT,
			name: 'description',
			label: 'Deskripsi',
			grid: [6, 6, 12],
			validationSchema: string().required(`Deskripsi wajib diisi`),
			defaultValue: ({ responseBE }) => {
				return responseBE.description;
			},
			readOnly: true,
		},
		{
			type: FORM_TYPE.CUSTOM,
			customTemplate,
		},
	];

	return (
		<RobotForm
			payload={{
				permissions,
			}}
			title={title}
			id={router.query.id}
			type='page'
			form={form}
			apiSubmit={update}
			apiShow={show}
			responseBE={(data: any) => {
				const permissionsDefault = data.permissions.map((item: any) => {
					return item.permission_id;
				});
				setPermissions(permissionsDefault);
			}}
		/>
	);
};

export default ClientPage;
