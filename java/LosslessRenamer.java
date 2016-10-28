import org.jetbrains.java.decompiler.main.extern.IIdentifierRenamer;
import org.jetbrains.java.decompiler.modules.renamer.ConverterHelper;

public class LosslessRenamer implements IIdentifierRenamer {
    private static int _renameCount = 0;
    private final ConverterHelper _helper = new ConverterHelper();

    private static String rename(String symbolType, String originalName) {
        return symbolType + "_rn_" + originalName + "_" + (++_renameCount);
    }

    private static String rename(String symbolType, String className, String originalName) {
        return rename(symbolType, className + "_" + originalName);
    }

    @Override
    public boolean toBeRenamed(Type elementType, String className, String element, String descriptor) {
        return _helper.toBeRenamed(elementType, className, element, descriptor);
    }

    @Override
    public String getNextClassName(String fullName, String shortName) {
        return rename("Class", shortName);
    }

    @Override
    public String getNextFieldName(String className, String field, String descriptor) {
        return rename("field", className, field);
    }

    @Override
    public String getNextMethodName(String className, String method, String descriptor) {
        return rename("method", className, method);
    }
}