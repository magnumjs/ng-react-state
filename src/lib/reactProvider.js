import useSharedState from 'shared-state-hook/lib/shared-state-hook';
import useHooksOutside from 'shared-state-hook/lib/outside-function-hook';


const reactProvider = (ProviderName, InitialVals, onUpdate) => {
    let notifier
    const rel = useHooksOutside(() => {

        const [, setData] = useSharedState(ProviderName, InitialVals, onUpdate)
        notifier = setData
    })
    return notifier
}

export default reactProvider