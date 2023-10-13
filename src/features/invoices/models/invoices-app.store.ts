import { makeAutoObservable } from 'mobx';
import {
    apiClient,
    Loadable,
    createImmediateReaction,
    toUserFriendlyAddress,
    DTOInvoicesApp,
    TonCurrencyAmount
} from 'src/shared';
import { projectsStore } from 'src/entities';
import { InvoicesApp, InvoicesProjectForm, InvoicesStatistics } from './interfaces';

class InvoicesAppStore {
    invoicesApp$ = new Loadable<InvoicesApp | null>(null);

    appToken$ = new Loadable<string | null>(null);

    statistics$ = new Loadable<InvoicesStatistics | null>(null);

    get invoicesServiceAvailable(): boolean {
        return !!projectsStore.selectedProject?.capabilities.invoices;
    }

    constructor() {
        makeAutoObservable(this);

        createImmediateReaction(
            () => projectsStore.selectedProject?.id,
            project => {
                this.clearState();

                if (project) {
                    this.fetchInvoicesApp();
                }
            }
        );

        createImmediateReaction(
            () => this.invoicesApp$.value?.id,
            app => {
                this.clearAppRelatedState();

                if (app) {
                    this.fetchAppToken();
                    this.fetchInvoicesStatistics();
                }
            }
        );
    }

    fetchInvoicesApp = this.invoicesApp$.createAsyncAction(async () => {
        try {
            const response = await apiClient.api.getInvoicesApp({
                project_id: projectsStore.selectedProject!.id
            });

            if (!response.data.app) {
                return null;
            }

            return mapInvoicesAppDTOToInvoicesApp(response.data.app);
        } catch (e) {
            console.debug(e);
            return null;
        }
    });

    createInvoicesApp = this.invoicesApp$.createAsyncAction(
        async (form: InvoicesProjectForm) => {
            const response = await apiClient.api.createInvoicesApp(
                {
                    project_id: projectsStore.selectedProject!.id
                },
                {
                    name: form.name,
                    recipient_address: form.receiverAddress
                }
            );

            return mapInvoicesAppDTOToInvoicesApp(response.data.app);
        },
        {
            successToast: {
                title: 'Invoices app created successfully'
            },
            errorToast: {
                title: 'Invoices app creation error'
            }
        }
    );

    editInvoicesApp = this.invoicesApp$.createAsyncAction(
        async (form: Partial<InvoicesProjectForm> & { id: number }) => {
            const response = await apiClient.api.updateInvoicesApp(form.id, {
                name: form.name,
                recipient_address: form.receiverAddress
            });

            return mapInvoicesAppDTOToInvoicesApp(response.data.app!);
        },
        {
            successToast: {
                title: 'Invoices app updated successfully'
            },
            errorToast: {
                title: 'Invoices app updating error'
            }
        }
    );

    fetchAppToken = this.appToken$.createAsyncAction(async () => {
        const response = await apiClient.api.getInvoicesAppToken({
            app_id: this.invoicesApp$.value!.id
        });

        return response.data.token;
    });

    addWebhook = this.invoicesApp$.createAsyncAction(
        async (value: string) => {
            const response = await apiClient.api.createInvoicesAppWebhook(
                this.invoicesApp$.value!.id,
                { webhook: value }
            );

            return mapInvoicesAppDTOToInvoicesApp(response.data.app!);
        },
        {
            successToast: {
                title: 'Webhook added successfully'
            },
            errorToast: {
                title: "Webhook wasn't added"
            }
        }
    );

    deleteWebhook = this.invoicesApp$.createAsyncAction(
        async (id: string) => {
            const response = await apiClient.api.deleteInvoicesAppWebhook(
                this.invoicesApp$.value!.id,
                id
            );

            return mapInvoicesAppDTOToInvoicesApp(response.data.app!);
        },
        {
            successToast: {
                title: 'Webhook deleted successfully'
            },
            errorToast: {
                title: "Webhook wasn't deleted"
            }
        }
    );

    regenerateAppToken = this.appToken$.createAsyncAction(
        async () => {
            const response = await apiClient.api.regenerateInvoicesAppToken({
                app_id: this.invoicesApp$.value!.id
            });

            return response.data.token;
        },
        {
            successToast: {
                title: 'Token regenerated successfully'
            },
            errorToast: {
                title: 'Token regeneration error'
            }
        }
    );

    fetchInvoicesStatistics = this.statistics$.createAsyncAction(async () => {
        const response = await apiClient.api.getInvoicesStats({
            app_id: this.invoicesApp$.value!.id
        });

        return mapInvoicesStatsDTOToInvoicesStats(response.data.stats);
    });

    clearState(): void {
        this.invoicesApp$.clear();
    }

    clearAppRelatedState(): void {
        this.appToken$.clear();
        this.statistics$.clear();
    }
}

function mapInvoicesAppDTOToInvoicesApp(invoicesAppDTO: DTOInvoicesApp): InvoicesApp {
    return {
        id: invoicesAppDTO.id,
        name: invoicesAppDTO.name,
        creationDate: new Date(invoicesAppDTO.date_create),
        receiverAddress: toUserFriendlyAddress(invoicesAppDTO.recipient_address),
        webhooks: (invoicesAppDTO.webhooks || []).map(w => ({ id: w.id, value: w.webhook }))
    };
}

function mapInvoicesStatsDTOToInvoicesStats(
    invoicesStatsDTO: Awaited<ReturnType<typeof apiClient.api.getInvoicesStats>>['data']['stats']
): InvoicesStatistics {
    return {
        totalInvoices: invoicesStatsDTO.total,
        earnedTotal: new TonCurrencyAmount(invoicesStatsDTO.success_total),
        earnedLastWeek: new TonCurrencyAmount(invoicesStatsDTO.success_in_week),
        invoicesInProgress: invoicesStatsDTO.invoices_in_progress,
        awaitingForPaymentAmount: new TonCurrencyAmount(invoicesStatsDTO.total_amount_pending)
    };
}

export const invoicesAppStore = new InvoicesAppStore();
