import {Observable} from "tns-core-modules/data/observable";

function getMessage(counter) {
    if (counter <= 0) {
        return "Hoorraaay! You unlocked the NativeScript clicker achievement!";
    } else {
        return counter + " taps left";
    }
}

export function createViewModel() {
    var viewModel = new ViewModelObservable();

    return viewModel;
}

export class ViewModelObservable extends Observable {
    public counter = 42;
    public message = getMessage(this.counter);

    onTap() {
        this.counter -= 1;
        this.set("message", getMessage(this.counter));
    }
}