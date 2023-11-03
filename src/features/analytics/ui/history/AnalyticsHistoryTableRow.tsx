import { FunctionComponent, useContext } from 'react';
import { Center, Flex, Spinner, Td, Tr, useConst } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { analyticsHistoryTableStore, AnalyticsQuery, isAnalyticsQueryCompleted } from '../../model';
import { TooltipHoverable, toTimeLeft, toDateTime, useCountup } from 'src/shared';
import { toJS } from 'mobx';
import { AnalyticsHistoryTableContext } from './analytics-history-table-context';
import { CurrencyRate } from 'src/entities';
import { AnalyticsQueryStatusBadge } from './AnalyticsQueryStatusBadge';
import { useNavigate } from 'react-router-dom';

const LoadingRow: FunctionComponent<{ style: React.CSSProperties }> = ({
    style: { top, ...style }
}) => {
    const { rowHeight } = useContext(AnalyticsHistoryTableContext);
    return (
        <Tr
            top={parseFloat(top!.toString()) + parseFloat(rowHeight) + 'px'}
            h={rowHeight}
            maxH={rowHeight}
            style={style}
        >
            <Td pos="absolute" right="0" left="0" border="none" colSpan={4}>
                <Center>
                    <Spinner color="text.secondary" size="sm" />
                </Center>
            </Td>
        </Tr>
    );
};

const ItemRow: FunctionComponent<{ query: AnalyticsQuery; style: React.CSSProperties }> = observer(
    ({ query, style }) => {
        const navigate = useNavigate();
        const renderTime = useConst(Date.now());

        //  const { onCopy: onCopyRequest, hasCopied: hasCopiedRequest } = useClipboard(query.request);
        const { rowHeight } = useContext(AnalyticsHistoryTableContext);

        const passedSeconds =
            query.status === 'executing'
                ? Math.floor((renderTime - query.creationDate.getTime()) / 1000)
                : 0;

        const durationSeconds = useCountup(passedSeconds);
        const formattedDuration = durationSeconds === 0 ? '' : toTimeLeft(durationSeconds * 1000);

        const onRowClick = (): void => {
            navigate(`../query?id=${query.id}`);
        };

        return (
            <Tr
                sx={{ td: { px: 2, py: 0 } }}
                pos="absolute"
                top={parseFloat(style.top!.toString()) + parseFloat(rowHeight) + 'px'}
                left="0"
                display="table-row"
                w="100%"
                h={rowHeight}
                maxH={rowHeight}
                cursor="pointer"
                onClick={onRowClick}
            >
                <Td
                    minW="128px"
                    h={rowHeight}
                    maxH={rowHeight}
                    borderLeft="1px"
                    borderLeftColor="background.contentTint"
                    boxSizing="content-box"
                >
                    {isAnalyticsQueryCompleted(query) ? (
                        <Flex align="center" color="text.secondary">
                            {toTimeLeft(query.spentTimeMS)}
                            <CurrencyRate reverse amount={query.cost.amount} leftSign=" · $" />
                        </Flex>
                    ) : (
                        formattedDuration
                    )}
                </Td>
                <Td minW="108px" h={rowHeight} maxH={rowHeight} boxSizing="content-box">
                    {query.status === 'error' ? (
                        <TooltipHoverable
                            canBeShown
                            host={<AnalyticsQueryStatusBadge status={query.status} />}
                        >
                            {query.errorReason}
                        </TooltipHoverable>
                    ) : (
                        <AnalyticsQueryStatusBadge status={query.status} />
                    )}
                </Td>
                <Td w="100%" minW="300px" h={rowHeight} maxH={rowHeight} boxSizing="content-box">
                    {query.request}
                </Td>
                <Td
                    w="120px"
                    minW="120px"
                    maxW="120px"
                    h={rowHeight}
                    maxH={rowHeight}
                    color="text.secondary"
                    textAlign="right"
                    borderRight="1px"
                    borderRightColor="background.contentTint"
                    boxSizing="content-box"
                >
                    {toDateTime(query.creationDate)}
                </Td>
            </Tr>
        );
    }
);

const AnalyticsHistoryTableRow: FunctionComponent<{
    index: number;
    style: React.CSSProperties;
}> = ({ index, style }) => {
    if (analyticsHistoryTableStore.isItemLoaded(index)) {
        const query = toJS(analyticsHistoryTableStore.queries$.value[index]);
        return <ItemRow key={query.id} style={style} query={query} />;
    }

    return <LoadingRow style={style} />;
};

export default observer(AnalyticsHistoryTableRow);
