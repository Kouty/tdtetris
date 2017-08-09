import Vue, {ComponentOptions} from 'vue';

interface IMyComponent extends Vue {
    message: string;

    onClick (): void;
}

const PlayFieldComponent = {
    data() {
        return {
            message: 'Hello!',
        };
    },
    methods: {
        onClick() {
            // TypeScript knows that `this` is of type MyComponent
            // and that `this.message` will be a string
            window.alert(this.message);
        },
    },
    template: '<button @click="onClick">Click!</button>',

} as ComponentOptions<IMyComponent>;

export {PlayFieldComponent};
