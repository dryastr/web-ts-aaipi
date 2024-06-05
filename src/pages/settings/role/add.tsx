import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { NextPage } from 'next';
import Checks, { ChecksGroup } from 'src/components/bootstrap/forms/Checks';
import Icon from 'src/components/icon/Icon';
import RobotForm from 'src/components/robot/RobotForm';
import FORM_TYPE from 'src/constants/FORM_TYPE';
import { string } from 'yup';
import { create, show } from 'src/service/settings/role';
import { FormType } from 'src/type/form-type';

const Page: NextPage = () => {
	const title = 'Roles & Permissions';

	const [permissions, setPermissions] = useState<number[]>([]);
	const { isLoading, data }: any = useQuery({
		queryKey: ['permissions', 'permissions'],
		queryFn: () => show('permissions'),
		refetchOnWindowFocus: false,
	});

	// Setup Form Template
	const form: FormType[] = [
		{
			type: FORM_TYPE.INPUT_TEXT,
			name: 'name',
			label: 'Role',
			grid: [6, 6, 12],
			validationSchema: string().required(`Role wajib diisi`),
		},
		{
			type: FORM_TYPE.INPUT_TEXT,
			name: 'description',
			label: 'Deskripsi',
			grid: [6, 6, 12],
			validationSchema: string().required(`Deskripsi wajib diisi`),
		},
		{
			type: FORM_TYPE.CUSTOM,
			customTemplate: () => {
				return (
					<div className='col-12'>
						<div className='table-responsive'>
							<table className='table table-modern'>
								<tbody>
								{
									data?.data?.map((item: any, index: any) => {
										return (
											<>
												<tr>
													<td colSpan={2}><h6>{item.title}</h6></td>
												</tr>
												{
													Object.keys(item.permissions).map((itemPermission: any, indexPermission: any) => {
														return (
															<>
																<tr>
																	<td>
																		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
																		<Icon
																			icon={'ArrowRightAlt'}
																			style={{
																				fontSize: 15,
																			}}
																		/>&nbsp;&nbsp;&nbsp;
																		<b>{itemPermission}</b>
																	</td>
																	<td>
																		<ChecksGroup>
																		{
																			item.permissions[itemPermission].map((itemForm: any) => {
																				let permissionsMapping: number[] = permissions;

																				return (
																					<>
																						<b>
																							<Checks
																								type='checkbox'
																								id={itemForm.permission_id}
																								label={itemForm.name}
																								name={itemForm.permission_id}
																								value={itemForm.permission_id}
																								onChange={(e: any) => {
																									if (!permissionsMapping.includes(itemForm.permission_id) && e.target.checked) {
																										permissionsMapping.push(itemForm.permission_id);
																									} else {
																										permissionsMapping.splice(permissionsMapping.indexOf(itemForm.permission_id), 1);
																									}
																									setPermissions([...permissionsMapping]);
																								}}
																								checked={permissionsMapping.includes(itemForm.permission_id)}
																								isInline
																							/>
																						</b>
																					</>
																				)
																			})
																		}
																		</ChecksGroup>
																		
																	</td>
																</tr>
															</>
														)
													})
												}
											</>
										);
									})
								}
								</tbody>
							</table>
						</div>
					</div>
				)
			}
		}
	];

	return (
		<RobotForm
			payload={{
				permissions
			}}
			title={title}
			type='page'
			form={form}
			apiSubmit={create}
		/>
	);
};

export default Page;
