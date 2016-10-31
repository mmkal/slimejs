import { FontMetrics, Color, Polygon, Font, Image, Graphics } from "./shims";

interface Shape {
    method: string;
    arguments: any[];
    color: string;
}

export default class SuperGraphics {
    private shapes = new Array<Shape>();

    constructor(private dumbGraphics: Graphics) {
        Object.getOwnPropertyNames(Graphics.prototype).forEach(method => {
            const original: Function = this.dumbGraphics[method];
            this.dumbGraphics["original" + method] = original;
            if (method.startsWith("get") || method.startsWith("set") || method.startsWith("arcPath") || typeof original !== "function") return;

            this.dumbGraphics[method] = (a, b, c, d, e, f, g, h, i ,j) => {
                const args = [a, b, c, d, e, f, g, h, i, j];
                if (args[9] === "somekindofrecursivething") {
                    original.apply(this.dumbGraphics, args);
                } else {
                    const currentColor = this.dumbGraphics.ctx.strokeStyle.toString();
                    this.addShape({ method: method, arguments: args, color: currentColor });
                }
            };
        });
    }

    private isReplacement(oldShape: Shape, newShape: Shape) {
        return oldShape.method === newShape.method 
            && oldShape.arguments.length == newShape.arguments.length
            && oldShape.arguments.every((arg, index) => newShape.arguments[index] === arg);
    }

    private addShape(newShape: Shape) {
        const oldShapeIndex = this.shapes.findIndex(oldShape => this.isReplacement(oldShape, newShape));
        if (oldShapeIndex > -1) {
            this.shapes.splice(oldShapeIndex, 1);
        }
        this.shapes.push(newShape);
        const ctx = this.dumbGraphics.ctx;
        ctx.strokeStyle
        ctx.clearRect(0, 0, 100000, 100000);
        this.shapes.forEach(shape => {
            ctx.strokeStyle = shape.color;
            ctx.fillStyle = shape.color;
            const method: Function = this.dumbGraphics["original" + shape.method];
            const args = Array.from(shape.arguments);
            args[9] = "somekindofrecursivething";
            method.apply(this.dumbGraphics, args);
        });
    }
}

