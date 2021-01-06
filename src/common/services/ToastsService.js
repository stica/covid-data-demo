export default {
    makeToast(toast, title, message, variant = null) {
        toast.toast(message, {
            title: title,
            variant: variant,
            solid: true
        });
    }
}