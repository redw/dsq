class MathUtil {
    public static linear(start:number, end:number, time:number) {
        return (end - start) * time + start;
    }

    public static clamp(value:number, min:number, max:number) {
        return Math.max(min, Math.min(max, value));
    }
}
