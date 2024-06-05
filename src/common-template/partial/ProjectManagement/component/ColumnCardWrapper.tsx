import React, { FC } from 'react';
import { Draggable, DraggableProvided, DraggableStateSnapshot } from '@hello-pangea/dnd';
import Card from 'src/components/bootstrap/Card';
import classNames from 'classnames';
import { TCard, TCards, TColumnsData } from '../type/types';
import { getItemStyle } from '../helper/style';
import ColumnCard from './ColumnCard';

interface IColumnCardWrapper {
	columnKey: string;
	columnsData: TColumnsData;
	cardsData: TCards;
	setCardsData(...args: unknown[]): unknown;
}
const ColumnCardWrapper: FC<IColumnCardWrapper> = ({
	columnKey,
	columnsData,
	cardsData,
	setCardsData,
}) => {
	const cardsInTheColumn: TCard[] = cardsData[columnKey];

	return (
		<>
			{cardsInTheColumn.map((card, index) => (
				<Draggable key={card.id} draggableId={card.id} index={index}>
					{(
						providedDraggable: DraggableProvided,
						snapshotDraggable: DraggableStateSnapshot,
					) => (
						<Card
							shadow='none'
							borderSize={1}
							className={classNames('rounded-2', {
								'border-info': snapshotDraggable.isDragging,
							})}
							ref={providedDraggable.innerRef}
							// eslint-disable-next-line react/jsx-props-no-spreading
							{...providedDraggable.draggableProps}
							// eslint-disable-next-line react/jsx-props-no-spreading
							{...providedDraggable.dragHandleProps}
							style={getItemStyle(
								snapshotDraggable.isDragging,
								providedDraggable.draggableProps.style,
							)}>
							<ColumnCard
								columnKey={columnKey}
								columnsData={columnsData}
								card={card}
								cardsData={cardsData}
								setCardsData={setCardsData}
								index={index}
							/>
						</Card>
					)}
				</Draggable>
			))}
		</>
	);
};

export default ColumnCardWrapper;
