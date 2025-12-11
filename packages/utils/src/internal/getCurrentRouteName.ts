import { useRoute } from 'vue-router'

export default function (): string {
    const currentRoute = useRoute();

    return currentRoute.name?.toString() ?? "";
}
