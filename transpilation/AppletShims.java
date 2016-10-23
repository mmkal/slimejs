public class Size {
	public int width;
	public int height;
}
public class Applet {
	public Size size() { return null; }
	public Image createImage(int x, int y) { return null; }
	public void showStatus(String s) {}
	public void repaint() {}
	public Graphics getGraphics() { return null; }
	public void requestFocus() {}
}
public class Color {
	public static Color yellow = null;
	public static Color black = null;
	public static Color red = null;
	public static Color gray = null;
	public static Color white = null;
	public static Color blue = null;
	public static Color green = null;
	public static Color pink = null;
	public static Color cyan = null;
	public static Color lightGray = null;
	public static Color darkGray = null;
	public Color(int r, int g, int b) {}
}
public class Graphics {
	public Font getFont() { return null; }
	public void setFont(Font f) {}
	public void setColor(Color c) {}
	public void fillRect(int x, int y, int w, int h) {}
	public FontMetrics getFontMetrics() { return null; }
	public void drawString(String s, int x, int y) {}
	public void drawImage(Image i, int x, int y, Object o) {}
	public void fillOval(int x, int y, int w, int h) {}
	public void fillArc(int x, int y, int w, int h, int s, int e) {}
	public void drawLine(int x, int y, int w, int h) {}
	public void fillPolygon(int[] xs, int[] ys, int n) {}
	public void drawArc(int x, int y, int w, int h, int s, int e) {}
}
public class Image {
	public Graphics getGraphics() { return null; }
}
public class Event {
	public int id;
	public int x;
	public int y;
	public static final int KEY_ACTION = 0;
	public int key;
	public static final int LEFT = 1;
	public static final int RIGHT = 2;
	public static final int UP = 3;
	public static final int DOWN = 4;
	public static final int KEY_ACTION_RELEASE = 5;
}
public class Font {
	public String getName() { return null; }
	public Font(String name, int w, int h) {}
}
public class FontMetrics {
	public int getHeight() { return 0; }
	public int stringWidth(String s) { return 0; }
	public int getAscent() { return 0; }
}
public class Thread {
    public static void sleep(long ms) {}
    public Thread(Runnable r) {}
    public void start() {}
    public void stop() {}
}
public interface Runnable {}

public class PrintStream {
	public Object println(String s) { return null; }
}
public class System {
	public static PrintStream out = null;
	public static long currentTimeMillis() { return 0L; }
}