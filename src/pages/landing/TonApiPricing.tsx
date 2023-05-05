import { ComponentProps, FunctionComponent } from 'react';
import { Box, Grid } from '@chakra-ui/react';
import { TonApiTierCard, tonApiTiersStore } from 'src/features';
import { observer } from 'mobx-react-lite';
import { H3, H3Thin } from 'src/shared';

const TonApiPricing: FunctionComponent<ComponentProps<typeof Box>> = props => {
    if (!tonApiTiersStore.tiers$.isResolved) {
        return null;
    }

    return (
        <Box {...props}>
            <H3 mb="7" textAlign="center">
                Pricing
            </H3>
            <Grid
                justifyContent="center"
                gap="4"
                templateColumns="repeat(4, 1fr)"
                w="100%"
                gridTemplate={{
                    base: 'auto / 1fr',
                    lg: '1fr 1fr / 1fr 1fr',
                    xl: '1fr / repeat(4, 1fr)'
                }}
            >
                {tonApiTiersStore.tiers$.value.map(tier => (
                    <TonApiTierCard
                        tier={tier}
                        key={tier.id}
                        variant="elevated"
                        tonPriceStyles={{ mt: '1', mb: '6', textStyle: 'h3Thin' }}
                        zeroTonPricePlaceholder={
                            <H3Thin mb="6" mt="1" color="text.secondary">
                                Forever
                            </H3Thin>
                        }
                    />
                ))}
            </Grid>
        </Box>
    );
};

export default observer(TonApiPricing);
